package com.example.demo.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="service_providers")
public class ServiceProvider 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int sp_id;
	@Column
	private String name;
	@OneToOne
	@JoinColumn(name="login_id")
	private Login login_id;
	public ServiceProvider() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public ServiceProvider(int id)
	{
		this.sp_id=id;
	}
	
	public ServiceProvider(String name, Login login_id) {
		super();
		this.name = name;
		this.login_id = login_id;
	}


	public int getSp_id() {
		return sp_id;
	}

	public void setSp_id(int sp_id) {
		this.sp_id = sp_id;
	}

	public Login getLogin_id() {
		return login_id;
	}

	public void setLogin_id(Login login_id) {
		this.login_id = login_id;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	 
	
	
	
}
