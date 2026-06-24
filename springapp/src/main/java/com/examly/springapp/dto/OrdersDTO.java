// package com.examly.springapp.dto;

// import java.math.BigDecimal;
// import java.time.LocalDateTime;
// import java.util.List;

// public class OrdersDTO {

//     private Long id;
//     private Long customerId;
//     private String customerUsername;
//     private LocalDateTime orderDate;
//     private BigDecimal totalAmount;
//     private String orderStatus;
//     private String paymentStatus;
//     private List<OrderItemsDTO> orderItems;

//     public OrdersDTO(Long id, Long customerId, String customerUsername,
//                      LocalDateTime orderDate, BigDecimal totalAmount,
//                      String orderStatus, String paymentStatus,
//                      List<OrderItemsDTO> orderItems) {
//         this.id = id;
//         this.customerId = customerId;
//         this.customerUsername = customerUsername;
//         this.orderDate = orderDate;
//         this.totalAmount = totalAmount;
//         this.orderStatus = orderStatus;
//         this.paymentStatus = paymentStatus;
//         this.orderItems = orderItems;
//     }
//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }

//     public Long getCustomerId() { return customerId; }
//     public void setCustomerId(Long customerId) { this.customerId = customerId; }

//     public String getCustomerUsername() { return customerUsername; }
//     public void setCustomerUsername(String customerUsername) { this.customerUsername = customerUsername; }

//     public LocalDateTime getOrderDate() { return orderDate; }
//     public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }

//     public BigDecimal getTotalAmount() { return totalAmount; }
//     public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

//     public String getOrderStatus() { return orderStatus; }
//     public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }

//     public String getPaymentStatus() { return paymentStatus; }
//     public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

//     public List<OrderItemsDTO> getOrderItems() { return orderItems; }
//     public void setOrderItems(List<OrderItemsDTO> orderItems) { this.orderItems = orderItems; }
// }
package com.examly.springapp.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.examly.springapp.model.Orders;

public class OrdersDTO {

    private Long id;
    private Long customerId;
    private String customerUsername;
    private LocalDateTime orderDate;
    private BigDecimal totalAmount;
    private String orderStatus;
    private String paymentStatus;
    private List<OrderItemsDTO> orderItems;

    // No-args constructor
    public OrdersDTO() {}

    // All-args constructor
    public OrdersDTO(Long id, Long customerId, String customerUsername,
                     LocalDateTime orderDate, BigDecimal totalAmount,
                     String orderStatus, String paymentStatus,
                     List<OrderItemsDTO> orderItems) {
        this.id = id;
        this.customerId = customerId;
        this.customerUsername = customerUsername;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.orderStatus = orderStatus;
        this.paymentStatus = paymentStatus;
        this.orderItems = orderItems;
    }

    // Static method to convert entity to DTO
    public static OrdersDTO fromEntity(Orders order) {
        if (order == null) return null;

        return new OrdersDTO(
            order.getId(),
            order.getCustomer() != null ? order.getCustomer().getId() : null,
            order.getCustomer() != null ? order.getCustomer().getUsername() : null,
            order.getOrderDate(),
            order.getTotalAmount(),
            order.getOrderStatus() != null ? order.getOrderStatus().name() : null,
            order.getPaymentStatus() != null ? order.getPaymentStatus().name() : null,
            order.getOrderItems() != null
                ? order.getOrderItems().stream()
                    .map(OrderItemsDTO::fromEntity)
                    .collect(Collectors.toList())
                : null
        );
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public String getCustomerUsername() { return customerUsername; }
    public void setCustomerUsername(String customerUsername) { this.customerUsername = customerUsername; }

    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public String getOrderStatus() { return orderStatus; }
    public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public List<OrderItemsDTO> getOrderItems() { return orderItems; }
    public void setOrderItems(List<OrderItemsDTO> orderItems) { this.orderItems = orderItems; }
}
