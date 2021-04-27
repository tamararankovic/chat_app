import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

import websocket.WebSocket;

@Stateless
@Path("/test")
@LocalBean
public class ChatBean {

	@EJB WebSocket ws;
	
	@GET
	@Path("/")
	public String test() {
		return "RADI!!";
	}
}
