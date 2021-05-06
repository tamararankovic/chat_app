package model;

import java.io.Serializable;
import java.time.LocalDateTime;

public class Message implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private User sender;
	private User receiver;
	private LocalDateTime created;
	private String subject;
	private String content;
	
	public Message() {
		
	}
	
	public Message(User sender, User receiver, LocalDateTime created, String subject, String content) {
		super();
		this.sender = sender;
		this.receiver = receiver;
		this.created = created;
		this.subject = subject;
		this.content = content;
	}

	public User getSender() {
		return sender;
	}

	public User getReceiver() {
		return receiver;
	}

	public LocalDateTime getCreated() {
		return created;
	}

	public String getSubject() {
		return subject;
	}

	public String getContent() {
		return content;
	}
}
