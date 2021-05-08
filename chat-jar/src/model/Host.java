package model;

import java.io.Serializable;

public class Host implements Serializable {

	private static final long serialVersionUID = 1L;

	private String address;
	private String alias;
	private String masterAddress;
	
	public Host() {
		
	}
	
	public Host(String address, String alias, String masterAddress) {
		super();
		this.address = address;
		this.alias = alias;
		this.masterAddress = masterAddress;
	}
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getAddress() {
		return address;
	}
	public String getAlias() {
		return alias;
	}
	public String getMasterAddress() {
		return masterAddress;
	}
	
	public boolean isMaster() {
		return masterAddress == null || masterAddress.equals("");
	}

	@Override
	public boolean equals(Object obj) {
		return this.address.equals(((Host)obj).address);
	}
}
