package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.entities.Service;
import com.example.demo.repositories.ServiceRepository;

@org.springframework.stereotype.Service
public class ServiceService 
{

	@Autowired
	private ServiceRepository srpo;
	
	public List<Service> getAllService()
	{
		return srpo.findAll();
	}
	
	public List<Service> getMyService(int sp_id)
	{
		return srpo.getMyService(sp_id);
	}
	
	public Service insertService(Service s)
	{
		return srpo.save(s);
	}
	
	
	public List<Service> getAllSpecificService(int sp_id )
	{
		return srpo.getMyService(sp_id);
	}
	
	public List<com.example.demo.entities.Service> getcleaning(String s) 
	  {
	    return srpo.getService(s);
	  }
	 
}
