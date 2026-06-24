package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
import com.examly.springapp.dto.VendorRequest;
import com.examly.springapp.dto.VendorsDTO;
import com.examly.springapp.model.Vendors;
import com.examly.springapp.model.Users;
import com.examly.springapp.service.VendorsService;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/vendor")
public class VendorsController {

    @Autowired
    private VendorsService vendorService;


     @GetMapping
    public Page<VendorsDTO> getVendors(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return vendorService.getVendorsPage(pageable);
    }
    @PostMapping("/post")
    public VendorsDTO saveVendor(@RequestBody VendorRequest vendorRequest) {
        return vendorService.addVendor(vendorRequest);
    }
     @GetMapping("/sorted")
    public List<VendorsDTO> getVendorsSortedByName() {
        return vendorService.getVendorsSortedByName();
    }
    @GetMapping("/all")
    public List<VendorsDTO> getAllVendors() {
        return vendorService.getVendors();
    }
      @GetMapping("/get/{id}")
     public VendorsDTO getVendorsByid(@PathVariable long id) {
      return vendorService.getVendorById(id);
      }
      @GetMapping("/get/byuser/{userId}")
   public VendorsDTO getVendorByUserId(@PathVariable Long userId) {
    return  vendorService.getVendorByUserId(userId);
}


    @PutMapping("/update/{id}")
    public VendorsDTO modifyVendor(@PathVariable Long id, @RequestBody Vendors vendor) {
        return vendorService.updateVendor(id, vendor);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteVendor(@PathVariable Long id) {
        return vendorService.deleteVendor(id);
    }
    @PutMapping("/approve/{vendorId}")
    public VendorsDTO approveVendor(
            @PathVariable Long vendorId,
            @RequestParam Long approvedByUserId,
            @RequestParam(required = false) String notes) {
        Users approver = new Users();
        approver.setId(approvedByUserId);
        return vendorService.approveVendor(vendorId, approver, notes);
    }
    @PutMapping("/reject/{vendorId}")
    public VendorsDTO rejectVendor(
            @PathVariable Long vendorId,
            @RequestParam Long approvedByUserId,
            @RequestParam String notes) {
        Users approver = new Users();
        approver.setId(approvedByUserId);
        return vendorService.rejectVendor(vendorId, approver, notes);
    }
    @PutMapping("/suspend/{vendorId}")
    public VendorsDTO suspendVendor(
            @PathVariable Long vendorId,
            @RequestParam String reason) {
        return vendorService.suspendVendor(vendorId, reason);
    }
    @GetMapping("/checkCompliance/{vendorId}")
    public boolean checkComplianceStatus(@PathVariable Long vendorId) {
        return vendorService.checkComplianceStatus(vendorId);
    }
    @GetMapping("/countByStatus")
    public long countByStatus(@RequestParam Vendors.ApprovalStatus status) {
        return vendorService.countVendorsByStatus(status);
    }
}
