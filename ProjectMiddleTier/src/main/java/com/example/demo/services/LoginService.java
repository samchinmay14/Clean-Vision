package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repositories.LoginRepository;
import com.example.demo.entities.*;

@Service
public class LoginService {

	@Autowired
	private LoginRepository login_repo;
	
	public Login getLogin(String email,String password)
	{
		Login l;
		Optional<Login>ol=login_repo.getLogin(email, password);
		try {
			l = ol.get();
		}
		catch(Exception e)
		{
			l=null;
		}
		return l;
	}
	
	public Login insertLogin(Login l)
	{
		return login_repo.save(l);
	}
	
	public boolean updateStatus(int id,boolean s)
	{
		if (login_repo.updateStatus(id,s) == 1)
			return true;
		else
			return false;
	}
	
	public List<Login> getAllLogin()
	{
		return login_repo.findAll();
	}
	
}
