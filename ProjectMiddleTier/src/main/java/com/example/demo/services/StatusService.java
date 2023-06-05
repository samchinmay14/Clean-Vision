package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Status;
import com.example.demo.repositories.StatusRepository;

@Service
public class StatusService 
{
	@Autowired
	private StatusRepository srpo;
	
	public Status getById(int id)
	{
		return  srpo.findById(id).get();
	}
}
