package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.examly.springapp.model.Orders;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
      @Query("SELECT o FROM Orders o WHERE o.customer.id = :id")
     List<Orders> findByCustomerId(@Param("id")Long customerId);

}
