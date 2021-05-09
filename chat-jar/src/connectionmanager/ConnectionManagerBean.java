package connectionmanager;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.AccessTimeout;
import javax.ejb.Remote;
import javax.ejb.Schedule;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.management.AttributeNotFoundException;
import javax.management.InstanceNotFoundException;
import javax.management.MBeanException;
import javax.management.MBeanServer;
import javax.management.MalformedObjectNameException;
import javax.management.ObjectName;
import javax.management.ReflectionException;
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
	private List<String> connectedNodes = new ArrayList<String>();
	
	@PostConstruct
	private void init() {
		getLocalNodeInfo();
		if(!localNode.isMaster())
			handshake();
	}
	
	@Override
	public List<String> registerNode(String nodeAlias) {
		System.out.println("Registering a node with alias: " + nodeAlias);
		for (String n : connectedNodes) {
			ResteasyClient client = new ResteasyClientBuilder().build();
			ResteasyWebTarget rtarget = client.target("http://" + n + "/siebog-war/rest/connection");
			ConnectionManager rest = rtarget.proxy(ConnectionManager.class);
			rest.addNode(nodeAlias);
		}
		//TODO: Send back lists of registered users, logged in users and messages
		//TODO: If unsuccessful, delete node and instruct all the other nodes to do the same
		List<String> returnNodes = new ArrayList<String>(connectedNodes);
		returnNodes.add(localNode.getAlias());
		connectedNodes.add(nodeAlias);
		return returnNodes;
	}

	@Override
	public void addNode(String nodeAlias) {
		System.out.println("Adding node with alias: " + nodeAlias);
		connectedNodes.add(nodeAlias);
	}

	@Override
	public void deleteNode(String alias) {
		System.out.println("Deleting node with alias: " + alias);
		connectedNodes.remove(alias);
		//TODO: Delete users that were logged in in this node
	}

	@Override
	@AccessTimeout(value = 30, unit = TimeUnit.SECONDS)
	public String pingNode() {
		System.out.println("Pinged");
		return "ok";
	}
	
	private void getLocalNodeInfo() {
		String nodeAddress = getNodeAddress();
		String nodeAlias = getNodeAlias() + ":8080";
		String masterAlias = getMasterAlias();
		localNode = new Host(nodeAddress, nodeAlias, masterAlias);
		System.out.println("node alias: " + localNode.getAlias() + ", node address: " + 
		localNode.getAddress() + ", master alias: " + 
		localNode.getMasterAlias());
	}
	
	private String getMasterAlias() {
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
	
	private String getNodeAddress() {
		try {
			MBeanServer mBeanServer = ManagementFactory.getPlatformMBeanServer();
			ObjectName http = new ObjectName("jboss.as:socket-binding-group=standard-sockets,socket-binding=http");
			return (String) mBeanServer.getAttribute(http, "boundAddress");
		} catch (MalformedObjectNameException | InstanceNotFoundException | AttributeNotFoundException | ReflectionException | MBeanException e) {
			e.printStackTrace();
			return null;
		}
		
	}
	
	private String getNodeAlias() {
		return System.getProperty("jboss.node.name");
	}
	
	private void handshake() {
		System.out.println("Initiating a handshake, master: " + localNode.getMasterAlias());
		ResteasyClient client = new ResteasyClientBuilder().build();
		ResteasyWebTarget rtarget = client.target("http://" + localNode.getMasterAlias() + "/chat-war/rest/connection");
		ConnectionManager rest = rtarget.proxy(ConnectionManager.class);
		connectedNodes = rest.registerNode(localNode.getAlias());
		System.out.println("Handshake successful. Connected nodes: " + connectedNodes);
	}
	
	@Schedule(hour = "*", minute="*", second="*/30")
	private void heartbeat() {
		if(localNode.isMaster()) {
			System.out.println("Heartbeat protocol initiated");
			for(String node : connectedNodes) {
				System.out.println("Pinging node with alias: " + node);
				boolean pingSuccessful = pingNode(node);
				if(!pingSuccessful) {
					System.out.println("Node with alias: " + node + " not alive. Deleting..");
					connectedNodes.remove(node);
					instructNodesToDeleteNode(node);
				}
			}
		}
	}

	private boolean pingNode(String node) {
		int triesLeft = 2;
		boolean pingSuccessful = false;
		ResteasyClient client = new ResteasyClientBuilder().build();
		ResteasyWebTarget rtarget = client.target("http://" + node + "/chat-war/rest/connection");
		ConnectionManager rest = rtarget.proxy(ConnectionManager.class);
		while(triesLeft > 0) {
			try {
				String response = rest.pingNode();
				if(response.equals("ok")) {
					pingSuccessful = true;
					break;
				}
			} catch(Exception e) {
				e.printStackTrace();
			} finally {
				triesLeft--;
			}
		}
		return pingSuccessful;
	}
	
	@PreDestroy
	private void shutDown() {
		instructNodesToDeleteNode(localNode.getAlias());
	}
	
	private void instructNodesToDeleteNode(String nodeAlias) {
		ResteasyClient client = new ResteasyClientBuilder().build();
		for(String node : connectedNodes) {
			ResteasyWebTarget rtarget = client.target("http://" + node + "/chat-war/rest/connection");
			ConnectionManager rest = rtarget.proxy(ConnectionManager.class);
			rest.deleteNode(nodeAlias);
		}
	}
}
