package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.dto.OrderItemsDTO;
import com.examly.springapp.model.OrderItems;
import com.examly.springapp.repository.OrderItemsRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderItemsService {

    @Autowired
    private OrderItemsRepository orderItemRepo;

    public OrderItemsDTO addOrderItem(OrderItems item) {
        OrderItems saved = orderItemRepo.save(item);
        return new OrderItemsDTO(
                saved.getId(),
                saved.getOrder() != null ? saved.getOrder().getId() : null,
                saved.getProduct() != null ? saved.getProduct().getId() : null,
                saved.getProduct() != null ? saved.getProduct().getSnackName() : null,
                saved.getQuantity(),
                saved.getUnitPrice(),
                saved.getTotalPrice()
        );
    }

    public List<OrderItemsDTO> getAllOrderItems() {
        return orderItemRepo.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public OrderItemsDTO updateOrderItem(Long id, OrderItems item) {
        OrderItems existingItem = orderItemRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order item not found"));

        existingItem.setOrder(item.getOrder());
        existingItem.setProduct(item.getProduct());
        existingItem.setQuantity(item.getQuantity());
        existingItem.setUnitPrice(item.getUnitPrice());
        existingItem.setTotalPrice(item.getTotalPrice());

        OrderItems updated = orderItemRepo.save(existingItem);
        return mapToDTO(updated);
    }

    public String deleteOrderItem(Long id) {
        orderItemRepo.deleteById(id);
        return "Order item deleted successfully";
    }

    private OrderItemsDTO mapToDTO(OrderItems item) {
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
