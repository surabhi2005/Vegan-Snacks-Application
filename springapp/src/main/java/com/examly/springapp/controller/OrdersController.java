package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.dto.OrdersDTO;
import com.examly.springapp.model.Orders;
import com.examly.springapp.service.OrdersService;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrdersController {

    @Autowired
    private OrdersService orderService;

    @PostMapping("/add")
    public OrdersDTO createOrder(@RequestBody Orders order) {
        return orderService.addOrder(order);
    }

    @GetMapping("/all")
    public List<OrdersDTO> getAllOrders() {
        return orderService.getAllOrders();
    }
     @GetMapping("/bycustomer/{id}")
    public List<OrdersDTO> getOrdersByCustomer(@PathVariable Long id) {
        return orderService.getOrdersByCustomerId(id);
    }

    @PutMapping("/update/{id}")
    public OrdersDTO modifyOrder(@PathVariable Long id, @RequestBody Orders order) {
        return orderService.updateOrder(id, order);
    }

    @DeleteMapping("/delete/{id}")
    public String removeOrder(@PathVariable Long id) {
        return orderService.deleteOrder(id);
    }
}
