package com.example.demo.controllers;

 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dummyentities.DummyAdmin;
import com.example.demo.entities.Admin;
import com.example.demo.entities.Login;
import com.example.demo.entities.Role;
import com.example.demo.services.AdminService;
import com.example.demo.services.LoginService;
import com.example.demo.services.RoleService;

@CrossOrigin("http://localhost:3000")
@RestController
public class AdminController {

	@Autowired
	private AdminService aservice;
	
	@Autowired
	private RoleService rservice;
	
	@Autowired
	private LoginService lservice;
 
	@PostMapping("/regadmin")
	public Admin registerAdmin(@RequestBody DummyAdmin da)
	{
		Role r=rservice.getById(3);
		Login l=new Login(da.getPassword(),da.getEmail(),da.getContact(),da.getAddress(),r,true);
		Login save=lservice.insertLogin(l);
		Admin a=new Admin(da.getF_name(), da.getL_name(), save);
		return aservice.registerAdmin(a);
	}
}
