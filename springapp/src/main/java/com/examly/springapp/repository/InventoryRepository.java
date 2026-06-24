package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.examly.springapp.model.Inventory;
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    // @Query("SELECT i FROM Inventory i WHERE i.id = :id")
    // Inventory findInventoryById(@Param("id") Long id);
    Inventory findById(long id);

}

