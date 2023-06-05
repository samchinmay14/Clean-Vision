package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dummyentities.DummyServiceProvider;
import com.example.demo.entities.Login;
import com.example.demo.entities.PassbasedEncryption;
import com.example.demo.entities.Role;
import com.example.demo.entities.SaltValue;
import com.example.demo.entities.ServiceProvider;
import com.example.demo.services.LoginService;
import com.example.demo.services.RoleService;
import com.example.demo.services.ServiceProviderServices;

@CrossOrigin("http://localhost:3000")
@RestController
public class ServiceProviderController {

	@Autowired
	private ServiceProviderServices spservice;
	
	@Autowired
	private RoleService rservice;
	
	@Autowired
	private LoginService lservice;
	
	@Autowired
	SaltValue saltValue;
	
	@PostMapping("/regserviceprovider")
	public ServiceProvider registerServiceProvider(@RequestBody DummyServiceProvider ds )
	{
		Role r=rservice.getById(2);
		String encrypted=PassbasedEncryption.genrateSecurePassword(ds.getPassword(),saltValue.getSalt());
		Login l=new Login( encrypted,ds.getEmail(),ds.getContact(),ds.getAddress(),r,false);
		lservice.insertLogin(l);
		ServiceProvider sp=new ServiceProvider(ds.getName(),l);
		return spservice.registerServiceProvider(sp);
		
	}
	@GetMapping("/serviceproviders")
	public List<ServiceProvider> getPendingRequests()
	{
		return spservice.getPendingRequests();
	}
	
	@GetMapping("/serviceproviderByLogin_id")
	public ServiceProvider getByLogin_id(@RequestParam("login_id") int login_id)
	{
		return spservice.getByLogin_id(login_id);
	}
	
	 
	
	
	 
	
	
}
