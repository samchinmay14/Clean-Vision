package com.example.demo.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ManyToAny;

@Entity
@Table(name="logins")
public class Login 
{
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY )
	private int login_id;
	@Column
	private String password;
	@Column
	private String email;
	@Column
	private String contact;
	@Column
	private String  address;
	@ManyToOne
	@JoinColumn(name="role_id")
	private Role role_id;
	@Column
	private boolean status;
	
	public Login() 
	{
		
	}
	public Login(int login_id)
	{
		this.login_id=login_id;
	}
	
	public Login(String password, String email, String contact, String address, Role role_id, boolean status) {
		super();
		this.password = password;
		this.email = email;
		this.contact = contact;
		this.address = address;
		this.role_id = role_id;
		this.status = status;
	}


	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getLogin_id() {
		return login_id;
	}
	public void setLogin_id(int login_id) {
		this.login_id = login_id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Role getRole_id() {
		return role_id;
	}
	public void setRole_id(Role role_id) {
		this.role_id = role_id;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
		

}
