package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.dto.InventoryDTO;
import com.examly.springapp.model.Inventory;
import com.examly.springapp.service.InventoryService;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @PostMapping("/add")
    public InventoryDTO createInventory(@RequestBody Inventory inventory) {
        Inventory saved = inventoryService.addInventory(inventory);
        return new InventoryDTO(
                saved.getId(),
                saved.getProduct() != null ? saved.getProduct().getId() : null,
                saved.getProduct() != null ? saved.getProduct().getSnackName() : null,
                saved.getCurrentStock(),
                saved.getReorderPoint(),
                saved.getMaxStock(),
                saved.getCostPerUnit(),
                saved.getLastRestockDate(),
                saved.getLastUpdated(),
                saved.getLocation()
        );
    }

    @GetMapping("/all")
    public List<InventoryDTO> getAllInventory() {
        return inventoryService.getInventory();
    }
    @GetMapping("/get/{id}")
public InventoryDTO getInventoryByid(@PathVariable long id) {
    return inventoryService.getInventoryById(id);
}


    @PutMapping("/update/{id}")
    public InventoryDTO modifyInventory(@PathVariable Long id, @RequestBody Inventory inventory) {
        return inventoryService.updateInventory(id, inventory);
    }

    @DeleteMapping("/delete/{id}")
    public String removeInventory(@PathVariable Long id) {
        return inventoryService.deleteInventory(id);
    }
}
