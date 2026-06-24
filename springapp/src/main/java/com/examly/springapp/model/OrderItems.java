package com.examly.springapp.model;

import java.math.BigDecimal;
import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Orders order;
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private VeganSnack product;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "unit_price", precision = 10, scale = 2, nullable = false)
    private BigDecimal unitPrice;

    @Column(name = "total_price", precision = 10, scale = 2, nullable = false)
    private BigDecimal totalPrice;

    public OrderItems() {}

    public OrderItems(Orders order, VeganSnack product, Integer quantity, BigDecimal unitPrice, BigDecimal totalPrice) {
        this.order = order;
        this.product = product;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.totalPrice = totalPrice;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Orders getOrder() { return order; }
    public void setOrder(Orders order) { this.order = order; }

    public VeganSnack getProduct() { return product; }
    public void setProduct(VeganSnack product) { this.product = product; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }

    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }
}

