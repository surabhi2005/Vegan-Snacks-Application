package com.examly.springapp.dto;

import java.time.LocalDate;

public class CertificationsDTO {

    private Long id;
    private Long vendorId;
    private String vendorBusinessName;
    private String certificationType;
    private String certificateNumber;
    private LocalDate issueDate;
    private LocalDate expiryDate;

    public CertificationsDTO(Long id, Long vendorId, String vendorBusinessName,
                             String certificationType, String certificateNumber,
                             LocalDate issueDate, LocalDate expiryDate) {
        this.id = id;
        this.vendorId = vendorId;
        this.vendorBusinessName = vendorBusinessName;
        this.certificationType = certificationType;
        this.certificateNumber = certificateNumber;
        this.issueDate = issueDate;
        this.expiryDate = expiryDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getVendorId() { return vendorId; }
    public void setVendorId(Long vendorId) { this.vendorId = vendorId; }

    public String getVendorBusinessName() { return vendorBusinessName; }
    public void setVendorBusinessName(String vendorBusinessName) { this.vendorBusinessName = vendorBusinessName; }

    public String getCertificationType() { return certificationType; }
    public void setCertificationType(String certificationType) { this.certificationType = certificationType; }

    public String getCertificateNumber() { return certificateNumber; }
    public void setCertificateNumber(String certificateNumber) { this.certificateNumber = certificateNumber; }

    public LocalDate getIssueDate() { return issueDate; }
    public void setIssueDate(LocalDate issueDate) { this.issueDate = issueDate; }

    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }
}
