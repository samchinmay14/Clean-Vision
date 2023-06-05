package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Service;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Integer> {
	@Query("select s from Service s where s.sp_id.sp_id=:sp_id")
	public List<Service> getMyService(int sp_id);
	
	@Query("select s from Service s where s_name = :s ")
	  public List<Service> getService(String s);
	
 
	
	

}
