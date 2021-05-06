package chatmanager;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.ejb.LocalBean;
import javax.ejb.Remote;
import javax.ejb.Singleton;

import model.Message;
import model.User;

@Singleton
@LocalBean
@Remote(ChatManagerRemote.class)
public class ChatManagerBean implements ChatManagerRemote {

	private Set<User> registeredUsers = new HashSet<User>(); 
	private Map<String, User> loggedInUsers = new HashMap<String, User>();
	private List<Message> messages = new ArrayList<Message>();
	
	@Override
	public boolean register(User user) {
		if (existsRegistered(user.getUsername()))
			return false;
		else {
			registeredUsers.add(user);
			return true;
		}
	}

	@Override
	public boolean logIn(User user, String identifier) {
		if (!existsRegistered(user.getUsername(), user.getPassword()))
			return false;
		else {
			loggedInUsers.put(identifier, getRegistered(user.getUsername(), user.getPassword()));
			return true;
		}
	}

	@Override
	public boolean logOut(String identifier) {
		if (existsLoggedIn(identifier)) {
			loggedInUsers.remove(identifier);
			return true;
		}
		else {
			return false;
		}
	}

	@Override
	public List<User> getRegistered() {
		return registeredUsers.stream().collect(Collectors.toList());
	}

	@Override
	public List<User> getLoggedIn() {
		return loggedInUsers.values().stream().distinct().collect(Collectors.toList());
	}

	@Override
	public void saveMessage(Message message) {
		messages.add(message);
	}

	@Override
	public List<Message> getMessages(String username) {
		List<Message> userMessages = new ArrayList<Message>();
		for(Message m : messages)
			if (m.getSender().getUsername().equals(username) || m.getReceiver().getUsername().equals(username))
				userMessages.add(m);
		userMessages.sort((m1, m2) -> m1.getCreated().compareTo(m2.getCreated()));
		return userMessages;
	}

	@Override
	public boolean isLoggedIn(String username) {
		return loggedInUsers.values().stream().anyMatch(u -> u.getUsername().equals(username));
	}

	@Override
	public User getRegistered(String username) {
		return registeredUsers.stream().filter(u -> u.getUsername().equals(username)).findFirst().orElse(null);
	}
	
	@Override
	public User getLoggedIn(String identifier) {
		if(existsLoggedIn(identifier))
			return loggedInUsers.get(identifier);
		else
			return null;
	}
	
	private User getRegistered(String username, String password) {
		return registeredUsers.stream().filter(u -> u.getUsername().equals(username) && u.getPassword().equals(password)).findFirst().orElse(null);
	}
	
	private boolean existsRegistered(String username) {
		return registeredUsers.stream().anyMatch(u -> u.getUsername().equals(username));
	}

	private boolean existsRegistered(String username, String password) {
		return registeredUsers.stream().anyMatch(u -> u.getUsername().equals(username) && u.getPassword().equals(password));
	}
	
	private boolean existsLoggedIn(String identifier) {
		return loggedInUsers.keySet().stream().anyMatch(i -> i.equals(identifier));
	}
}
