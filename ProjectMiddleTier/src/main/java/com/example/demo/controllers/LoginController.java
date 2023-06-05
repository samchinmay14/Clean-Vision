package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dummyentities.LoginCheck;
import com.example.demo.entities.Login;
import com.example.demo.entities.PassbasedEncryption;
import com.example.demo.entities.SaltValue;
import com.example.demo.services.LoginService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LoginController 
{
	@Autowired
	private LoginService login_serv;
	
	@Autowired
	SaltValue saltValue;
	
	@PostMapping("/checkLogin")
	public Login checkLogin(@RequestBody LoginCheck login_check)
	{
		System.out.println("Hello");
		String encrypted=PassbasedEncryption.genrateSecurePassword(login_check.getPassword(),saltValue.getSalt());
		return login_serv.getLogin(login_check.getUid(), encrypted );
	}
	
	@GetMapping("/approve")
	public boolean updateStatus(@RequestParam int id)
	{
		boolean s=true;
		return login_serv.updateStatus(id,s);
	
	}
	
	@GetMapping("/getAllLogins")
	public List<Login> getAllLogin()
	{
		return login_serv.getAllLogin();
	}
	
	
	
	
	 

}
