package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.dto.OrderItemsDTO;
import com.examly.springapp.dto.OrdersDTO;
import com.examly.springapp.model.Orders;
import com.examly.springapp.model.OrderItems;
import com.examly.springapp.repository.OrdersRepository;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository orderRepo;

    public OrdersDTO addOrder(Orders order) {
         if (order.getOrderItems() != null) {
        order.getOrderItems().forEach(item -> item.setOrder(order));
    }
        Orders saved = orderRepo.save(order);
        return mapToDTO(saved);
    }
      public List<OrdersDTO> getOrdersByCustomerId(Long customerId) {
         List<Orders> orders = orderRepo.findByCustomerId(customerId);
    return orders.stream()
                  .map(OrdersDTO::fromEntity)
                  .collect(Collectors.toList()); // use collect instead of toList() for Java 8+
    }
 
    public List<OrdersDTO> getAllOrders() {
        return orderRepo.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
public OrdersDTO updateOrder(Long id, Orders order) {
    Orders existingOrder = orderRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found"));
    existingOrder.setCustomer(order.getCustomer());
    existingOrder.setOrderDate(order.getOrderDate());
    existingOrder.setTotalAmount(order.getTotalAmount());
    existingOrder.setOrderStatus(order.getOrderStatus());
    existingOrder.setPaymentStatus(order.getPaymentStatus());

    existingOrder.getOrderItems().clear(); 
    if (order.getOrderItems() != null) {
        order.getOrderItems().forEach(item -> {
            item.setOrder(existingOrder); 
            existingOrder.getOrderItems().add(item);
        });
    }

    Orders updated = orderRepo.save(existingOrder);
    return mapToDTO(updated);
}


    public String deleteOrder(Long id) {
        orderRepo.deleteById(id);
        return "Order deleted successfully";
    }

    private OrdersDTO mapToDTO(Orders o) {
        return new OrdersDTO(
                o.getId(),
                o.getCustomer() != null ? o.getCustomer().getId() : null,
                o.getCustomer() != null ? o.getCustomer().getUsername() : null,
                o.getOrderDate(),
                o.getTotalAmount(),
                o.getOrderStatus() != null ? o.getOrderStatus().name() : null,
                o.getPaymentStatus() != null ? o.getPaymentStatus().name() : null,
                o.getOrderItems() != null
                        ? o.getOrderItems().stream()
                            .map(this::mapOrderItemToDTO)
                            .collect(Collectors.toList())
                        : null
        );
    }

    private OrderItemsDTO mapOrderItemToDTO(OrderItems item) {
        return new OrderItemsDTO(
                item.getId(),
                item.getOrder() != null ? item.getOrder().getId() : null,
                item.getProduct() != null ? item.getProduct().getId() : null,
                item.getProduct() != null ? item.getProduct().getSnackName() : null,
                item.getQuantity(),
                item.getUnitPrice(),
                item.getTotalPrice()
        );
    }
}
