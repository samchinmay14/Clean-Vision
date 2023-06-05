package com.example.demo.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="statuses")
public class Status 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int status_id;
	
	@Column
	String status;
	
	public Status()
	{
		
	}
	public Status(String status)
	{
		this.status=status;
	}

	public int getStatus_id() {
		return status_id;
	}

	public void setStatus_id(int status_id) {
		this.status_id = status_id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
