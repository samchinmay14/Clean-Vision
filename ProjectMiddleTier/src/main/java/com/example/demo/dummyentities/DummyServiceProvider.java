package com.example.demo.dummyentities;

public class DummyServiceProvider 
{
	private String name;
	private String email;
	private String contact;
	private String password;
	private String address;
	public DummyServiceProvider() {
		super();
		// TODO Auto-generated constructor stub
	}
	public DummyServiceProvider(String name, String email, String contact, String password, String address) {
		super();
		this.name = name;
		this.email = email;
		this.contact = contact;
		this.password = password;
		this.address = address;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	
	
	
	 

}
