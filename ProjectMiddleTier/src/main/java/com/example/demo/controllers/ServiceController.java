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

import com.example.demo.dummyentities.DummyService;
import com.example.demo.entities.Service;
import com.example.demo.entities.ServiceProvider;
import com.example.demo.services.ServiceProviderServices;
import com.example.demo.services.ServiceService;

@CrossOrigin("http://localhost:3000")
@RestController
public class ServiceController 
{
	@Autowired
	private ServiceService sservice;
	
	@Autowired
	private ServiceProviderServices spservice;
	
	@GetMapping("/services")
	public List<Service> getAllService()
	{
		return sservice.getAllService();
	}
	
	@GetMapping("/myservices")
	public List<Service> getMyService(@RequestParam("login_id") int login_id)
	{
		ServiceProvider sp=spservice.getByLogin_id(login_id);
		System.out.println(login_id);
	 
		return sservice.getMyService(sp.getSp_id());
	}
	 
	@PostMapping("/insertservice")
	public Service insertService(@RequestBody Service ds)
	{
		System.out.println(ds.getDuration());
		System.out.println(ds.getS_name());
		System.out.println(ds.getCost());
		System.out.println(ds.getSp_id());
		System.out.println(ds.getSp_id().getName());
		System.out.println(ds.getDescription());
		return sservice.insertService(ds);
	}
	
	@GetMapping("/specific_services")
	public List<Service> getAllSpecificService(@RequestParam("sp_id") int sp_id )
	{
		return sservice.getMyService(sp_id);
	}
	
	@GetMapping("/getservice")
	  public List<com.example.demo.entities.Service> getcleaningservice(@RequestParam("service") String s)
	  {
	    return sservice.getcleaning(s);
	  }
	
	 
	 
	
	
}
