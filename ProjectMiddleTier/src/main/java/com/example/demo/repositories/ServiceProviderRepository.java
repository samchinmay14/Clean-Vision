package com.example.demo.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.ServiceProvider;

@Repository
public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, Integer> 
{
	@Query("select s from ServiceProvider s where s.login_id.status=0")
	public List<ServiceProvider> getPendingRequests();
	
	@Query("select s from ServiceProvider s where s.login_id.login_id=:login_id")
	public ServiceProvider getByLogin_id(int login_id);
	 
}
