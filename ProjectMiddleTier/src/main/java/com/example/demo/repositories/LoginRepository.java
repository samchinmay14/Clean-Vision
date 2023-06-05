package com.example.demo.repositories;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Login;

@Transactional
@Repository
public interface LoginRepository extends JpaRepository<Login, Integer> 
{
	@Query("select l from Login l where email = :email and password = :password")
	public Optional<Login> getLogin(String email,String password);
	
	
	@Modifying
	@Query("update Login l set l.status = :s  where l.login_id = :id")
	public int updateStatus(int id,boolean s);
}
