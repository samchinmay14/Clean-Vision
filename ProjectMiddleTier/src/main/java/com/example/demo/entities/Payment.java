package com.example.demo.entities;

 

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Customer;
 
 

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="payments")
public class Payment 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY )
	private int p_id;

	@OneToOne
	@JoinColumn(name="o_id")
	private Order o_id;
	
	@OneToOne
	@JoinColumn(name="c_id")
	private Customer c_id;
	
	@OneToOne()
	@JoinColumn(name="sp_id")
	private ServiceProvider sp_id;
	
	@Column
	private double charges; 
	
	@Column
	private int status; 
	
	@Column
	private double discount;
	
	public Payment()
	{
		
	}
	
	

	public Payment(Order o_id, Customer c_id, double charges, int status, double discount,ServiceProvider sp_id) {
		super();
		this.o_id = o_id;
		this.c_id = c_id;
		this.charges = charges;
		this.status = status;
		this.discount = discount;
		this.sp_id=sp_id;
	}



	public ServiceProvider getSp_id() {
		return sp_id;
	}



	public void setSp_id(ServiceProvider sp_id) {
		this.sp_id = sp_id;
	}



	public int getStatus() {
		return status;
	}



	public void setStatus(int status) {
		this.status = status;
	}



	public int getP_id() {
		return p_id;
	}

	public void setP_id(int p_id) {
		this.p_id = p_id;
	}

	public Order getO_id() {
		return o_id;
	}

	public void setO_id(Order o_id) {
		this.o_id = o_id;
	}

	public Customer getC_id() {
		return c_id;
	}

	public void setC_id(Customer c_id) {
		this.c_id = c_id;
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
}