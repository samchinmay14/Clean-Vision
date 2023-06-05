package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.dummyentities.DummyAdmin;
import com.example.demo.entities.Admin;
import com.example.demo.entities.Login;
import com.example.demo.entities.Role;
import com.example.demo.repositories.AdminRepository;

@Service
public class AdminService 
{
	@Autowired
	private AdminRepository arepo;
	
	public Admin registerAdmin(Admin a)
	{
		 
		return arepo.save(a);
	}
}
