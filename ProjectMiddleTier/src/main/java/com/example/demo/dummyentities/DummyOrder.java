package com.example.demo.dummyentities;

import java.sql.Date;
import java.util.List;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Service;
import com.example.demo.entities.ServiceProvider;
import com.example.demo.entities.Status;
import com.fasterxml.jackson.annotation.JsonFormat;

public class DummyOrder 
{
	private Customer c_id;
 
 
	@JsonFormat(pattern = "yyyy-mm-dd")
	private ServiceProvider sp_id;
	private Date delivery_date;
	private double charges;
	private double discount;
	private List<Service>list;
	public Customer getC_id() {
		return c_id;
	}
	public void setC_id(Customer c_id) {
		this.c_id = c_id;
	}
	 
	public Date getDelivery_date() {
		return delivery_date;
	}
	public void setDelivery_date(Date delivery_date) {
		this.delivery_date = delivery_date;
	}
	public double getCharges() {
		return charges;
	}
	public void setCharges(double charges) {
		this.charges = charges;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	public List<Service> getList() {
		return list;
	}
	public void setList(List<Service> list) {
		this.list = list;
	}
	public ServiceProvider getSp_id() {
		return sp_id;
	}
	public void setSp_id(ServiceProvider sp_id) {
		this.sp_id = sp_id;
	}
	
	
	
	
	
	
}
