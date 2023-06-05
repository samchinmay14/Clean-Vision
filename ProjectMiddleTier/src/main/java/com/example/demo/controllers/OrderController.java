package com.example.demo.controllers;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dummyentities.DummyOrder;
import com.example.demo.entities.Order;
import com.example.demo.entities.Order_item;
import com.example.demo.entities.Payment;
import com.example.demo.entities.ServiceProvider;
import com.example.demo.entities.Status;
import com.example.demo.services.OrderService;
import com.example.demo.services.Order_itemService;
import com.example.demo.services.PaymentService;
import com.example.demo.services.ServiceProviderServices;
import com.example.demo.services.StatusService;


 

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class OrderController 
{
	@Autowired 
	OrderService os;
	
	@Autowired
	Order_itemService ois;
	
	@Autowired
	StatusService sser;
	
	@Autowired
	PaymentService ps;
	
	@Autowired
	ServiceProviderServices sps;
	
	@GetMapping("/getAllOrders")
	public List<Order> getAllOrders()
	{
		return os.getAllOrders();
	}
	
	@PostMapping("/addorder")
	public void addOrder(@RequestBody Order o)
	{
		os.addOrder(o);
	}
	
	@PostMapping("/insertorder")
	public  List<Order_item> insertOrder(@RequestBody DummyOrder d)
	{
		 long millis=System.currentTimeMillis();  
		 java.sql.Date order_date = new java.sql.Date(millis); 
		  System.out.println(order_date);
		 ServiceProvider sp=sps.getById(d.getSp_id().getSp_id());
		 Order o=new Order(d.getC_id(),d.getDelivery_date(),sp,order_date);
		 Order savedorder=os.insertOrder(o);
		 Order_item oi;
		 Iterator<com.example.demo.entities.Service>lservic=d.getList().iterator();
		 Status st=sser.getById(1);
		 List<Order_item>loi=new ArrayList<>();
		 while(lservic.hasNext())
		 {
			 oi=new Order_item(savedorder,lservic.next(),st);
			 Order_item soi=ois.insertOrderItems(oi);
			 loi.add(soi);
		 }
		 Payment p=new Payment(savedorder,d.getC_id(),d.getCharges(),0,0,sp);
		 ps.insertPayment(p);
		 return loi;
	}
	
	@GetMapping("/getorderbyspid")
	public List<Order_item> getOrderBySpid(@RequestParam("sp_id") int id)
	{
		System.out.println(id);
		Order o=os.getOrderBySpid(id);
		System.out.println(o);
		return ois.getorderitembyoid(o.getO_id());
	}
	
	 
}

