package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Order;
import com.example.demo.entities.Order_item;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
	
	@Query("select o from Order o where o.sp_id=:id")
	public List<Order_item> getOrdersbySP(int id);

}
