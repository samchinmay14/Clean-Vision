package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.entities.Order;
import com.example.demo.repositories.OrderRepository;

@Service
public class OrderService 
{
	@Autowired
	OrderRepository orepo;
	
	public List<Order> getAllOrders()
	{
		return orepo.findAll();
	}
	
	public  Order getOrderById(int o_id)
	{
		return orepo.findById(o_id).get();
	}

	public void addOrder(Order o) 
	{
		orepo.save(o);
	}
	
	public  Order insertOrder(Order od)
	{
		return orepo.save(od);
	}
	
	public Order getOrderBySpid(int id)
	{
		return orepo.findById(id).get();
	}
	
	
}

