package websocket;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.ejb.LocalBean;
import javax.ejb.Singleton;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import agentmanager.AgentManagerBean;
import agentmanager.AgentManagerRemote;
import chatmanager.ChatManagerBean;
import chatmanager.ChatManagerRemote;
import model.User;
import util.JNDILookup;

@ServerEndpoint("/ws/{identifier}")
@Singleton
@LocalBean
public class WebSocket {

	private Map<Session, String> sessions = new HashMap<Session, String>();
	
	protected AgentManagerRemote agm() {
		return JNDILookup.lookUp(JNDILookup.AgentManagerLookup, AgentManagerBean.class);
	}
	
	protected ChatManagerRemote chm() {
		return JNDILookup.lookUp(JNDILookup.ChatManagerLookup, ChatManagerBean.class);
	}

	@OnOpen
	public void onOpen(Session session, EndpointConfig c, @PathParam("identifier") String identifier) {
		System.out.println("usao u websocket");
		if(!sessions.keySet().contains(session)) {
			agm().startAgent(session.getId(), JNDILookup.UserAgentLookup);
			User user = chm().getLoggedIn(identifier);
			sessions.put(session, user != null ? user.getUsername() : null);
			System.out.println("Session with id: " + session.getId() + " opened");
			try {
				session.getBasicRemote().sendText("sessionId:"+session.getId());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	@OnClose
	public void onClose(Session session) {
		agm().stopAgent(session.getId());
		sessions.remove(session);
		System.out.println("Session with id: " + session.getId() + " closed");
	}
	
	public void send(String sessionId, String message) {
		Session session = sessions.keySet().stream().filter(s -> s.getId().equals(sessionId)).findFirst().orElse(null);
		if(session != null && session.isOpen()) {
			try {
				session.getBasicRemote().sendText(message);
			} catch (IOException e) {
				try {
					session.close();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
				e.printStackTrace();
			}
		}
	}
	
	public void sendToOneLoggedIn(String username, String message) {
		for(Session session : sessions.keySet())
			if(sessions.get(session) != null && sessions.get(session).equals(username) && session.isOpen()) {
				try {
					session.getBasicRemote().sendText(message);
				} catch (IOException e) {
					try {
						session.close();
					} catch (IOException e1) {
						e1.printStackTrace();
					}
					e.printStackTrace();
				}
			}
	}
	
	public void sendToAllLoggedIn(String message) {
		for(Session session : sessions.keySet())
			if(sessions.get(session) != null && session.isOpen()) {
				try {
					session.getBasicRemote().sendText(message);
				} catch (IOException e) {
					try {
						session.close();
					} catch (IOException e1) {
						e1.printStackTrace();
					}
					e.printStackTrace();
				}
			}
	}
	
	@OnError
	public void onError(Session session, Throwable t) {
		agm().stopAgent(session.getId());
		sessions.remove(session);
	}
	
	public void bindUsernameToSession(String username, String sessionId) {
		Session session = sessions.keySet().stream().filter(s -> s.getId().equals(sessionId)).findFirst().orElse(null);
		if (session != null)
			sessions.put(session, username);
	}
	
	public void unbindUsernameFromSession(String sessionId) {
		Session session = sessions.keySet().stream().filter(s -> s.getId().equals(sessionId)).findFirst().orElse(null);
		if (session != null)
			sessions.put(session, null);
	}
	
	public String getUsernameBoundToSession(String sessionId) {
		Session session = sessions.keySet().stream().filter(s -> s.getId().equals(sessionId)).findFirst().orElse(null);
		if (session != null)
			return sessions.get(session);
		else
			return null;
	}
}
