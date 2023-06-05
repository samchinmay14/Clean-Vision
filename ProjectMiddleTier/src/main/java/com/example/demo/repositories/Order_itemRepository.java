package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Order_item;

@Repository
public interface Order_itemRepository extends JpaRepository<Order_item, Integer> 
{
	

	@Query("select oi from Order_item oi where oi.o_id.o_id=:o_id")
	public List<Order_item> getOrderitembyoid(int o_id);

	@Modifying
	@Query("update Order_item o set o.status_id = 2 where o.oi_id= :id ")
	public void OrderCompleted(int id);

}

