package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.dto.OrderItemsDTO;
import com.examly.springapp.model.OrderItems;
import com.examly.springapp.service.OrderItemsService;

import java.util.List;

@RestController
@RequestMapping("/order-items")
public class OrderItemsController {

    @Autowired
    private OrderItemsService orderItemsService;

    @PostMapping("/add")
    public OrderItemsDTO createOrderItem(@RequestBody OrderItems item) {
        return orderItemsService.addOrderItem(item);
    }

    @GetMapping("/all")
    public List<OrderItemsDTO> getAllOrderItems() {
        return orderItemsService.getAllOrderItems();
    }

    @PutMapping("/update/{id}")
    public OrderItemsDTO modifyOrderItem(@PathVariable Long id, @RequestBody OrderItems item) {
        return orderItemsService.updateOrderItem(id, item);
    }

    @DeleteMapping("/delete/{id}")
    public String removeOrderItem(@PathVariable Long id) {
        return orderItemsService.deleteOrderItem(id);
    }
}

