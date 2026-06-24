package com.examly.springapp.controller;

import com.examly.springapp.dto.OrderItemsDTO;
import com.examly.springapp.service.SalesAnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/analytics/sales")
public class SalesAnalyticsController {

    private final SalesAnalyticsService salesAnalyticsService;

    public SalesAnalyticsController(SalesAnalyticsService salesAnalyticsService) {
        this.salesAnalyticsService = salesAnalyticsService;
    }
    @GetMapping("/revenue/{vendorId}")
    public ResponseEntity<BigDecimal> getTotalRevenue(@PathVariable Long vendorId) {
        BigDecimal revenue = salesAnalyticsService.calculateTotalRevenue(vendorId);
        return ResponseEntity.ok(revenue);
    }
    @GetMapping("/units-sold/{vendorId}")
    public ResponseEntity<Long> getTotalUnitsSold(@PathVariable Long vendorId) {
        Long unitsSold = salesAnalyticsService.calculateTotalUnitsSold(vendorId);
        return ResponseEntity.ok(unitsSold);
    }
    @PostMapping("/profit/{vendorId}")
    public ResponseEntity<BigDecimal> getTotalProfit(@PathVariable Long vendorId,
                                                     @RequestBody Map<Long, BigDecimal> productCosts) {
        BigDecimal profit = salesAnalyticsService.calculateTotalProfit(vendorId, productCosts);
        return ResponseEntity.ok(profit);
    }
    @GetMapping("/top-products/{vendorId}")
    public ResponseEntity<List<OrderItemsDTO>> getTopSellingProducts(@PathVariable Long vendorId,
                                                                     @RequestParam(defaultValue = "5") int topN) {
        List<OrderItemsDTO> topProducts = salesAnalyticsService.getTopSellingProducts(vendorId, topN);
        return ResponseEntity.ok(topProducts);
    }
}
