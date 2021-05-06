package chatmanager;

import java.util.List;

import javax.ejb.Remote;

import model.Message;
import model.User;

@Remote
public interface ChatManagerRemote {

	public boolean register(User user);
	
	public boolean logIn(User user, String identifier);
	
	public boolean logOut(String username);
	
	public List<User> getRegistered();
	
	public List<User> getLoggedIn();
	
	public void saveMessage(Message message);
	
	public List<Message> getMessages(String username);
	
	public boolean isLoggedIn(String username);
	
	public User getRegistered(String username);

	public User getLoggedIn(String identifier);
}
