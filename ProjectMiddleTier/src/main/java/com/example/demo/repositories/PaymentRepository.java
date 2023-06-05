package com.example.demo.repositories;


import java.util.List;
import java.util.Optional;
 
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Payment;

@Transactional
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> 
{
	/*
	@Query("select p from Payment p where c_id= :c.getC_id() " )
	Optional<Payment> findByCustId(Customer c);
	*/
	@Query("select p from Payment p where p.sp_id.sp_id=:sp_id and p.status=0")
	public List<Payment> getbySp_id(int sp_id );
	
	@Modifying
	@Query("update Payment p set p.status = 1  where p.p_id = :p_id")
	public int changeStatus( int p_id );
	
	
}
