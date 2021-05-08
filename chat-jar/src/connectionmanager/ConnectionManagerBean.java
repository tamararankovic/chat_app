package connectionmanager;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.Remote;
import javax.ejb.Schedule;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.ws.rs.Path;

import org.jboss.resteasy.client.jaxrs.ResteasyClient;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.jboss.resteasy.client.jaxrs.ResteasyWebTarget;

import model.Host;
import util.ResourceLoader;

@Singleton
@Startup
@Remote(ConnectionManager.class)
@Path("/connection")
public class ConnectionManagerBean implements ConnectionManager {

	private Host localNode;
	private List<Host> connectedNodes = new ArrayList<Host>();
	
	@PostConstruct
	private void init() {
		getLocalNodeInfo();
		if(!localNode.isMaster())
			handshake();
	}
	
	@Override
	public List<Host> registerNode(Host node) {
		for (Host n : connectedNodes) {
			ResteasyClient client = new ResteasyClientBuilder().build();
			ResteasyWebTarget rtarget = client.target("http://" + n.getAddress() + ":8080/siebog-war/rest/connection");
			ConnectionManager rest = rtarget.proxy(ConnectionManager.class);
			rest.addNode(node);
		}
		//TODO: Send back lists of registered users, logged in users and messages
		//TODO: If unsuccessful, delete node and instruct all the other nodes to do the same
		List<Host> returnNodes = new ArrayList<Host>(connectedNodes);
		returnNodes.add(localNode);
		connectedNodes.add(node);
		return returnNodes;
	}

	@Override
	public void addNode(Host node) {
		connectedNodes.add(node);
		
	}

	@Override
	public void deleteNode(String alias) {
		Host node = connectedNodes.stream().filter(n -> n.getAlias().equals(alias)).findFirst().orElse(null);
		if(node != null) {
			connectedNodes.remove(node);
			//TODO: Delete users that were logged in on this node
		}
	}

	@Override
	public String pingNode() {
		return "ok";
	}
	
	private void getLocalNodeInfo() {
		try {
			InetAddress inetAddress = InetAddress.getLocalHost();
			String nodeAddress = inetAddress.getHostAddress();
			String nodeName = inetAddress.getHostName();
			String masterAddress = getMasterAddress();
			localNode = new Host(nodeAddress, nodeName, masterAddress);
			System.out.println("node name: " + localNode.getAlias() + ", node address: " + 
			localNode.getAddress() + ", master address: " + 
			localNode.getMasterAddress());
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
	}
	
	private String getMasterAddress() {
		try {
			File f = ResourceLoader.getFile(ConnectionManager.class, "", "connection.properties");
			FileInputStream fileInput = new FileInputStream(f);
			Properties properties = new Properties();
			properties.load(fileInput);
			fileInput.close();
			return properties.getProperty("master");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	private void handshake() {
		ResteasyClient client = new ResteasyClientBuilder().build();
		ResteasyWebTarget rtarget = client.target("http://" + localNode.getMasterAddress() + ":8080/chat-war/rest/connection");
		ConnectionManager rest = rtarget.proxy(ConnectionManager.class);
		connectedNodes = rest.registerNode(localNode);
	}
	
	@Schedule(hour = "*", minute="*", second="*/15")
	private void heartbeat() {
		for(Host node : connectedNodes) {
			boolean pingSuccessful = pingNode(node);
			if(!pingSuccessful)
				connectedNodes.remove(node);
				instructNodesToDeleteNode(node.getAlias());
		}
	}

	private boolean pingNode(Host node) {
		int triesLeft = 2;
		boolean pingSuccessful = false;
		ResteasyClient client = new ResteasyClientBuilder().build();
		ResteasyWebTarget rtarget = client.target("http://" + node.getAddress() + ":8080/chat-war/rest/connection");
		ConnectionManager rest = rtarget.proxy(ConnectionManager.class);
		while(triesLeft > 0) {
			String response = rest.pingNode();
			if(response.equals("ok")) {
				pingSuccessful = true;
				break;
			}
			triesLeft--;
		}
		return pingSuccessful;
	}
	
	@PreDestroy
	private void shutDown() {
		instructNodesToDeleteNode(localNode.getAlias());
	}
	
	private void instructNodesToDeleteNode(String nodeAlias) {
		ResteasyClient client = new ResteasyClientBuilder().build();
		for(Host node : connectedNodes) {
			ResteasyWebTarget rtarget = client.target("http://" + node.getAddress() + ":8080/chat-war/rest/connection");
			ConnectionManager rest = rtarget.proxy(ConnectionManager.class);
			rest.deleteNode(nodeAlias);
		}
	}
}
