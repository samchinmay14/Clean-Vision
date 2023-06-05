package com.example.demo.controllers;

 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dummyentities.DummyCustomer;
import com.example.demo.entities.Customer;
import com.example.demo.entities.Login;
import com.example.demo.entities.PassbasedEncryption;
import com.example.demo.entities.Role;
import com.example.demo.entities.SaltValue;
import com.example.demo.repositories.RoleRepository;
import com.example.demo.services.CustomerService;
import com.example.demo.services.LoginService;
import com.example.demo.services.RoleService;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
public class CustomerController {

	@Autowired
	private CustomerService cservice;
	
	@Autowired
	private RoleService rservice;
	
	@Autowired
	private LoginService lservice;
	
	@Autowired
	SaltValue saltValue;
	
	@PostMapping("/regcustomer")
	public Customer rgisterCustomer(@RequestBody DummyCustomer dc )
	{
		Role r=rservice.getById(1);
		String encrypted=PassbasedEncryption.genrateSecurePassword(dc.getPassword(),saltValue.getSalt());
		Login l=new Login(encrypted,dc.getEmail(),dc.getContact(),dc.getAddress(),r,true);
		Login save=lservice.insertLogin(l);
		Customer c=new Customer(dc.getF_name(),dc.getL_name(),save);
		return cservice.registerCustomer(c);
	}
	
	@GetMapping("/getcustomer")
	public Customer getCustomerByLoginId(@RequestParam("login_id") int login_id)
	{
		System.out.print(login_id);
		return cservice.getCustomerById(login_id);
	}
}
