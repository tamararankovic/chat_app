package websocket;

import javax.ejb.LocalBean;
import javax.ejb.Singleton;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@Singleton
@ServerEndpoint("/ws")
@LocalBean
public class WebSocket {

	@OnOpen
	public void onOpen(Session session) {
		
	}
	
	@OnClose
	public void onClose(Session session) {
		
	}
	
	@OnMessage
	public void onMessage(Session session, String message) {
		
	}
	
	@OnError
	public void onError(Session session, Throwable t) {
		
	}
}
