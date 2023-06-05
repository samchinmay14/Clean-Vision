package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entities.Customer;
import com.example.demo.repositories.CustomerRepository;

@Service
public class CustomerService {
	@Autowired
	private CustomerRepository crpo;
	
	public Customer registerCustomer(Customer c)
	{
		return crpo.save(c);
	}
	
	public Customer getCustomerById(int login_id)
	{
		return crpo.getCustomerById(login_id) ;
	}
}
