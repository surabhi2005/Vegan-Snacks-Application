package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.dto.CertificationsDTO;
import com.examly.springapp.model.Certifications;
import com.examly.springapp.model.Vendors;
import com.examly.springapp.repository.VendorsRepository;
import com.examly.springapp.service.CertificationsService;

import java.util.List;

@RestController
@RequestMapping("/certifications")
public class CertificationsController {

    @Autowired
    private CertificationsService certService;

    @Autowired
    private VendorsRepository vendorRepository;

    // ✅ Add certification
 @PostMapping("/add")
public CertificationsDTO createCertification(@RequestBody CertificationsDTO dto) {
    Vendors vendor = vendorRepository.findById(dto.getVendorId())
            .orElseThrow(() -> new RuntimeException("Vendor not found with id " + dto.getVendorId()));

    Certifications cert = new Certifications();
    cert.setCertificateNumber(dto.getCertificateNumber());

    // Convert String -> Enum
    try {
        cert.setCertificationType(
            Certifications.CertificationType.valueOf(dto.getCertificationType().toUpperCase())
        );
    } catch (IllegalArgumentException e) {
        throw new RuntimeException("Invalid certification type: " + dto.getCertificationType());
    }

    cert.setIssueDate(dto.getIssueDate());
    cert.setExpiryDate(dto.getExpiryDate());
    cert.setVendor(vendor);

    return certService.addCertification(cert);
}


    // ✅ Get all certifications (for admin/users)
    @GetMapping("/all")
    public List<CertificationsDTO> getAllCertifications() {
        return certService.getAllCertifications();
    }

    // ✅ Get certifications by vendorId (for vendor dashboard)
    @GetMapping("/vendor/{vendorId}")
    public List<CertificationsDTO> getVendorCertifications(@PathVariable Long vendorId) {
        return certService.getCertificationsByVendorId(vendorId);
    }

    // ✅ Update certification
    @PutMapping("/update/{id}")
    public CertificationsDTO modifyCertification(@PathVariable Long id, @RequestBody Certifications cert) {
        return certService.updateCertification(id, cert);
    }

    // ✅ Delete certification
    @DeleteMapping("/delete/{id}")
    public String removeCertification(@PathVariable Long id) {
        return certService.deleteCertification(id);
    }
}
