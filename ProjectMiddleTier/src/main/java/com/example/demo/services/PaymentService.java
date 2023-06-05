package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Payment;
import com.example.demo.repositories.PaymentRepository;

@Service
public class PaymentService 
{
	@Autowired
	PaymentRepository pr;

	public List<Payment> getAllPayments() 
	{
		return pr.findAll();
	}

	public List<Payment> getbypaymentid(int id) 
	{
		return (List<Payment>) pr.findById(id).get();
	}
	
	public Payment insertPayment(Payment p)
	{
		return pr.save(p);
	}
	
	public List<Payment> getbySp_id(int sp_id )
	{
		return pr.getbySp_id(sp_id);
	}
	public int changeStatus( int p_id )
	{
		return pr.changeStatus(p_id);
	}
 
}