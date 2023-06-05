package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.dummyentities.DummyServiceProvider;
import com.example.demo.entities.Login;
import com.example.demo.entities.Role;
import com.example.demo.entities.ServiceProvider;
import com.example.demo.repositories.ServiceProviderRepository;

@Service
public class ServiceProviderServices {

	@Autowired
	private ServiceProviderRepository sprepo;
	
	public ServiceProvider registerServiceProvider(ServiceProvider sp)
	{ 
		return sprepo.save(sp);
		
	}
	
	public List<ServiceProvider> getPendingRequests()
	{
		return sprepo.getPendingRequests();
	}
	
	public  ServiceProvider getByLogin_id(int login_id)
	{
		return sprepo.getByLogin_id(login_id);
	}
	
	public  ServiceProvider getById(int sp_id)
	{
		return sprepo.findById(sp_id).get();
	}
	
	 
}
