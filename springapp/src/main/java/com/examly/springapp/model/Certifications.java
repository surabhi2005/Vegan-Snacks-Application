package com.examly.springapp.model;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "certifications")
public class Certifications {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendors vendor;

    public enum CertificationType {
        VEGAN, ORGANIC, FAIR_TRADE, KOSHER
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "certification_type")
    private CertificationType certificationType;

    @Column(name = "certificate_number", length = 100)
    private String certificateNumber;

    @Column(name = "issue_date")
    private LocalDate issueDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    public Certifications() {}

    public Certifications(Vendors vendor, CertificationType certificationType, String certificateNumber,
                          LocalDate issueDate, LocalDate expiryDate) {
        this.vendor = vendor;
        this.certificationType = certificationType;
        this.certificateNumber = certificateNumber;
        this.issueDate = issueDate;
        this.expiryDate = expiryDate;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Vendors getVendor() { return vendor; }
    public void setVendor(Vendors vendor) { this.vendor = vendor; }

    public CertificationType getCertificationType() { return certificationType; }
    public void setCertificationType(CertificationType certificationType) { this.certificationType = certificationType; }

    public String getCertificateNumber() { return certificateNumber; }
    public void setCertificateNumber(String certificateNumber) { this.certificateNumber = certificateNumber; }

    public LocalDate getIssueDate() { return issueDate; }
    public void setIssueDate(LocalDate issueDate) { this.issueDate = issueDate; }

    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }
}
