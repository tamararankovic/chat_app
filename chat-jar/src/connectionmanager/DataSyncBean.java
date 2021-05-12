package connectionmanager;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.ws.rs.Path;

import chatmanager.ChatManagerRemote;
import model.Message;
import model.User;
import websocket.WebSocket;

@Stateless
@Remote(DataSync.class)
@Path("/sync")
public class DataSyncBean implements DataSync {

	@EJB private ChatManagerRemote chatManager;
	@EJB WebSocket ws;
	
	@Override
	public void syncLoggedIn(String alias, List<User> users) {
		chatManager.syncLoggedIn(alias, users);
		ws.sendToAllLoggedIn(ws.getLoggedInListTextMessage(chatManager.getLoggedIn()));
	}

	@Override
	public void syncRegistered(List<User> users) {
		chatManager.syncRegistered(users);
		ws.sendToAllLoggedIn(ws.getRegisteredListTextMessage(chatManager.getRegistered()));
	}

	@Override
	public void syncMessages(List<Message> messages) {
		List<Message> newMessages = chatManager.syncMessages(messages);
		for(Message message : newMessages) {
			String sender = message.getSender().getUsername();
			String receiver = message.getReceiver().getUsername();
			ws.sendToOneLoggedIn(receiver, ws.getMessageTextMessage(message));
			ws.sendToOneLoggedIn(sender, ws.getMessageListTextMessage(chatManager.getMessages(sender), sender));
		}
	}

}
