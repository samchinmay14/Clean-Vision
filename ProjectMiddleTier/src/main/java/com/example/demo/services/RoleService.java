package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Role;
import com.example.demo.repositories.RoleRepository;

@Repository
public class RoleService 
{
	@Autowired
	private RoleRepository role_repo;
	
	public List<Role> getAllRolls()
	{
		return role_repo.findAll();
	}
	
	public Role getById(int id)
	{
		return role_repo.findById(id).get();
	}

}
