// package com.examly.springapp.repository;

// import org.springframework.data.jpa.repository.JpaRepository;
// import com.examly.springapp.model.OrderItems;

// public interface OrderItemsRepository extends JpaRepository<OrderItems, Long> {
// }

package com.examly.springapp.repository;

import com.examly.springapp.dto.OrderItemsDTO;
import com.examly.springapp.model.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemsRepository extends JpaRepository<OrderItems, Long> {

    @Query("SELECT new com.examly.springapp.dto.OrderItemsDTO(" +
           "oi.id, oi.order.id, oi.product.id, oi.product.snackName, oi.quantity, oi.unitPrice, (oi.unitPrice * oi.quantity)) " +
           "FROM OrderItems oi " +
           "WHERE oi.product.vendor.id = :vendorId")
    List<OrderItemsDTO> findOrderItemsByVendorId(Long vendorId);

}
