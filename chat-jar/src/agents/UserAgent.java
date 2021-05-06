package agents;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import javax.ejb.EJB;
import javax.ejb.Remote;
import javax.ejb.Stateful;

import chatmanager.ChatManagerRemote;
import messagemanager.AgentMessage;
import messagemanager.AgentMessageType;
import model.User;
import websocket.WebSocket;

@Stateful
@Remote(Agent.class)
public class UserAgent implements Agent {

	private static final long serialVersionUID = 1L;
	
	private String agentId;
	
	@EJB private ChatManagerRemote chatManager;
	@EJB WebSocket ws;

	@Override
	public void init(String agentId) {
		this.agentId = agentId;
	}

	@Override
	public void handleMessage(AgentMessage message) {
		System.out.println("entered agent");
		AgentMessageType type = message.getType();
		switch (type) {
			case LOG_IN: {
				String username = message.getAttributes().get("username");
				String password = message.getAttributes().get("password");
				logIn(username, password);
				break;
			}
			case REGISTER: {
				String username = message.getAttributes().get("username");
				String password = message.getAttributes().get("password");
				register(username, password);
				break;
			}
			case LOG_OUT: {
				String identifier = message.getAttributes().get("identifier");
				logOut(identifier);
				break;
			}
			case REGISTERED_LIST: {
				getRegistered();
				break;
			}
			case LOGGED_IN_LIST: {
				getLoggedIn();
				break;
			}
			case SEND_MESSAGE_ALL: {
				String subject = message.getAttributes().get("subject");
				String content = message.getAttributes().get("content");
				sendMessageToAll(subject, content);
				break;
			}
			case SEND_MESSAGE_USER: {
				String receiver = message.getAttributes().get("receiver");
				String subject = message.getAttributes().get("subject");
				String content = message.getAttributes().get("content");
				sendMessage(receiver, subject, content);
				break;
			}
			case GET_MESSAGES: {
				getAllMessages();
				break;
			}
		}
	}

	@Override
	public String getAgentId() {
		return agentId;
	}

	private void logIn(String username, String password) {
		String currentUsername = ws.getUsernameBoundToSession(agentId);
		if(currentUsername == null) {
			String identifier = UUID.randomUUID().toString();
			if (chatManager.logIn(new User(username, password), identifier)) {
				ws.bindUsernameToSession(username, agentId);
				ws.send(agentId, "login:OK " + identifier);
				ws.sendToAllLoggedIn(getLoggedInListTextMessage(chatManager.getLoggedIn()));
			} else {
				ws.send(agentId, "login:Logging in was unsuccessful! Incorrect username or password");
			}
		} else {
			ws.send(agentId, "login:You are already logged in!");
		}
	}
	
	private void logOut(String identifier) {
		User user = chatManager.getLoggedIn(identifier);
		if(user != null && user.getUsername().equals(ws.getUsernameBoundToSession(agentId)) && chatManager.logOut(identifier)) {
			ws.unbindUsernameFromSession(agentId);
			ws.send(agentId, "logout:OK");
			ws.sendToAllLoggedIn(getLoggedInListTextMessage(chatManager.getLoggedIn()));
		} else {
			ws.send(agentId, "logout:Logging out was unsuccessful!");
		}
	}
	
	private void register(String username, String password) {
		if(chatManager.register(new User(username, password))) {
			ws.send(agentId, "register:Registration was successful!");
			ws.sendToAllLoggedIn(getRegisteredListTextMessage(chatManager.getRegistered()));
		} else {
			ws.send(agentId, "register:Registration was unsuccessful! Try another username");
		}
	}
	
	private void getLoggedIn() {
		if(ws.getUsernameBoundToSession(agentId) != null)
			ws.send(agentId, getLoggedInListTextMessage(chatManager.getLoggedIn()));
	}
	
	private void getRegistered() {
		if(ws.getUsernameBoundToSession(agentId) != null)
			ws.send(agentId, getRegisteredListTextMessage(chatManager.getRegistered()));
	}
	
	private void getAllMessages() {
		if(ws.getUsernameBoundToSession(agentId) != null)
			ws.send(agentId, getMessageListTextMessage(chatManager.getMessages(ws.getUsernameBoundToSession(agentId))));
	}
	
	private void sendMessage(String receiverUsername, String subject, String content) {
		String username = ws.getUsernameBoundToSession(agentId);
		if(chatManager.getRegistered(receiverUsername) != null && username != null) {
			User receiver = chatManager.getRegistered(receiverUsername);
			User sender = chatManager.getRegistered(username);
			model.Message message = new model.Message(sender, receiver, LocalDateTime.now(), subject, content);
			chatManager.saveMessage(message);
			ws.sendToOneLoggedIn(receiverUsername, getMessageTextMessage(message));
			ws.send(agentId, getMessageListTextMessage(chatManager.getMessages(username)));
		}
	}
	
	private void sendMessageToAll(String subject, String content) {
		List<User> loggedInUsers = chatManager.getLoggedIn();
		for(User user : loggedInUsers)
			sendMessage(user.getUsername(), subject, content);
	}
	
	private String getLoggedInListTextMessage(List<User> users) {
		StringBuilder loggedInList = new StringBuilder();
		loggedInList.append("loggedInList:");
		for(User u : users) {
			loggedInList.append(u.getUsername());
			loggedInList.append(",");
		}
		return loggedInList.toString().substring(0, loggedInList.length()-1);
	}
	
	private String getRegisteredListTextMessage(List<User> users) {
		StringBuilder registeredList = new StringBuilder();
		registeredList.append("registeredList:");
		for(User u : users) {
			registeredList.append(u.getUsername());
			registeredList.append(",");
		}
		return registeredList.toString().substring(0, registeredList.length()-1);
	}
	
	private String getMessageListTextMessage(List<model.Message> messages) {
		StringBuilder messageList = new StringBuilder();
		messageList.append("messageList:");
		messageList.append("[");
		for(model.Message m : messages) {
			String otherUsername = m.getSender().getUsername();
			boolean incoming = true;
			if(ws.getUsernameBoundToSession(agentId).equals(otherUsername)) {
				otherUsername = m.getReceiver().getUsername();
				incoming = false;
			}
			messageList.append("{");
			messageList.append("\"otherUsername\":\"");
			messageList.append(otherUsername);
			messageList.append("\", \"incoming\":\"");
			messageList.append(incoming);
			messageList.append("\", \"subject\":\"");
			messageList.append(m.getSubject());
			messageList.append("\", \"content\":\"");
			messageList.append(m.getContent());
			messageList.append("\", \"dateTime\":\"");
			messageList.append(m.getCreated());
			messageList.append("\" }, ");
		}
		if(messageList.length() > 13)
			messageList.deleteCharAt(messageList.lastIndexOf(","));
		messageList.append("]");
		return messageList.toString();
	}
	
	private String getMessageTextMessage(model.Message message) {
		StringBuilder messageText = new StringBuilder();
		messageText.append("message:");
		messageText.append("{");
		messageText.append("\"otherUsername\":\"");
		messageText.append(message.getSender().getUsername());
		messageText.append("\", \"incoming\":\"");
		messageText.append(true);
		messageText.append("\", \"subject\":\"");
		messageText.append(message.getSubject());
		messageText.append("\", \"content\":\"");
		messageText.append(message.getContent());
		messageText.append("\", \"dateTime\":\"");
		messageText.append(message.getCreated());
		messageText.append("\" }");
		return messageText.toString();
	}
}
