package com.examly.springapp.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Users customer;

    @Column(name = "order_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime orderDate;

    @Column(name = "total_amount", precision = 10, scale = 2, nullable = false)
    private BigDecimal totalAmount;

    public enum OrderStatus {
        PENDING, PAID, SHIPPED, DELIVERED, CANCELLED
    }

    public enum PaymentStatus {
        PENDING, PAID, FAILED, REFUNDED
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status")
    private OrderStatus orderStatus = OrderStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItems> orderItems;


    public Orders() {}

    public Orders(Users customer, LocalDateTime orderDate, BigDecimal totalAmount,
                  OrderStatus orderStatus, PaymentStatus paymentStatus) {
        this.customer = customer;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.orderStatus = orderStatus;
        this.paymentStatus = paymentStatus;
    }
    public List<OrderItems> getOrderItems() {
    return orderItems;
}

public void setOrderItems(List<OrderItems> orderItems) {
    this.orderItems = orderItems;
}
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Users getCustomer() { return customer; }
    public void setCustomer(Users customer) { this.customer = customer; }

    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public OrderStatus getOrderStatus() { return orderStatus; }
    public void setOrderStatus(OrderStatus orderStatus) { this.orderStatus = orderStatus; }

    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }
}
