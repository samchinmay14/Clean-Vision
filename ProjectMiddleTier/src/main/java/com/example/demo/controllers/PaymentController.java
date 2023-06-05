package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Payment;
import com.example.demo.services.PaymentService;
@CrossOrigin("http://localhost:3000")
@RestController
public class PaymentController 
{
	@Autowired 
	PaymentService ps;
	
	@GetMapping("/getallpayments")
	public List<Payment> getAllPayments()
	{
		return ps.getAllPayments();
	}
	
	@GetMapping("/getbypaymentid")
	public List<Payment> getbyPaymentid(@RequestParam("id") int id )
	{
		return ps.getbypaymentid(id);
	}
	@GetMapping("/getSpPayments")
	public List<Payment> getbySp_id(@RequestParam("sp_id") int sp_id )
	{
		return ps.getbySp_id(sp_id);
	}
	@GetMapping("/paymentreceived")
	public int changeStatus(@RequestParam("p_id") int p_id )
	{
		return ps.changeStatus(p_id);
	}
	/*
	@GetMapping("/getbycustid")
	public Optional<Payment> getbyCusttId(@RequestParam("id") Customer c )
	{
		return ps.getbyCusttId(c);
	}
	*/
}

