package com.examly.springapp.model;
import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vendors")
public class Vendors {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
  @OneToOne
@JoinColumn(name = "user_id", nullable = false, unique = true)
private Users user;


    @Column(name = "business_name", nullable = false, length = 100)
    private String businessName;

    @Column(name = "business_license_number", unique = true, length = 50)
    private String businessLicenseNumber;

    @Column(name = "tax_id", length = 50)
    private String taxId;

    @Column(name = "business_address", nullable = false, columnDefinition = "TEXT")
    private String businessAddress;

    @Column(name = "business_phone", length = 15)
    private String businessPhone;

    @Column(name = "business_email", length = 100)
    private String businessEmail;

    @Column(name = "established_year")
    private Integer establishedYear;
    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;

    @Column(name = "target_market", columnDefinition = "TEXT")
    private String targetMarket;

    @Column(name = "business_description", columnDefinition = "TEXT")
    private String businessDescription;

      @Column(name = "haccp_certification_number", length = 50)
    private String haccpCertificationNumber;

    @Column(name = "fda_registration_number", length = 50)
    private String fdaRegistrationNumber;

    public enum ApprovalStatus {
        PENDING, APPROVED, REJECTED, SUSPENDED
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "approval_status", nullable = false)
    private ApprovalStatus approvalStatus = ApprovalStatus.PENDING;

       @Column(name = "approval_notes", columnDefinition = "TEXT")
    private String approvalNotes;

    @Column(name = "approval_date")
    private LocalDateTime approvalDate;
    @ManyToOne
    @JoinColumn(name = "approved_by")
    private Users approvedBy;

    @OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Certifications> certifications = new ArrayList<>();


    public Vendors() {
    }

    public Vendors(Users user, String businessName, String businessLicenseNumber, String taxId,
                   String businessAddress, String businessPhone, String businessEmail,
                   Integer establishedYear, String businessDescription,
                   ApprovalStatus approvalStatus, LocalDateTime approvalDate, Users approvedBy) {
        this.user = user;
        this.businessName = businessName;
        this.businessLicenseNumber = businessLicenseNumber;
        this.taxId = taxId;
        this.businessAddress = businessAddress;
        this.businessPhone = businessPhone;
        this.businessEmail = businessEmail;
        this.establishedYear = establishedYear;
        this.businessDescription = businessDescription;
        this.approvalStatus = approvalStatus;
        this.approvalDate = approvalDate;
        this.approvedBy = approvedBy;
    }
    public List<Certifications> getCertifications() {
    return certifications;
}

public void setCertifications(List<Certifications> certifications) {
    this.certifications = certifications;
}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getBusinessLicenseNumber() {
        return businessLicenseNumber;
    }

    public void setBusinessLicenseNumber(String businessLicenseNumber) {
        this.businessLicenseNumber = businessLicenseNumber;
    }

    public String getTaxId() {
        return taxId;
    }

    public void setTaxId(String taxId) {
        this.taxId = taxId;
    }

    public String getBusinessAddress() {
        return businessAddress;
    }

    public void setBusinessAddress(String businessAddress) {
        this.businessAddress = businessAddress;
    }

    public String getBusinessPhone() {
        return businessPhone;
    }

    public void setBusinessPhone(String businessPhone) {
        this.businessPhone = businessPhone;
    }

    public String getBusinessEmail() {
        return businessEmail;
    }

    public void setBusinessEmail(String businessEmail) {
        this.businessEmail = businessEmail;
    }

    public Integer getEstablishedYear() {
        return establishedYear;
    }

    public void setEstablishedYear(Integer establishedYear) {
        this.establishedYear = establishedYear;
    }

    public String getBusinessDescription() {
        return businessDescription;
    }

    public void setBusinessDescription(String businessDescription) {
        this.businessDescription = businessDescription;
    }

    public ApprovalStatus getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(ApprovalStatus approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public LocalDateTime getApprovalDate() {
        return approvalDate;
    }

    public void setApprovalDate(LocalDateTime approvalDate) {
        this.approvalDate = approvalDate;
    }

    public Users getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(Users approvedBy) {
        this.approvedBy = approvedBy;
    }

    public Integer getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(Integer yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    public String getTargetMarket() {
        return targetMarket;
    }

    public void setTargetMarket(String targetMarket) {
        this.targetMarket = targetMarket;
    }

    public String getHaccpCertificationNumber() {
        return haccpCertificationNumber;
    }

    public void setHaccpCertificationNumber(String haccpCertificationNumber) {
        this.haccpCertificationNumber = haccpCertificationNumber;
    }

    public String getFdaRegistrationNumber() {
        return fdaRegistrationNumber;
    }

    public void setFdaRegistrationNumber(String fdaRegistrationNumber) {
        this.fdaRegistrationNumber = fdaRegistrationNumber;
    }

    public String getApprovalNotes() {
        return approvalNotes;
    }

    public void setApprovalNotes(String approvalNotes) {
        this.approvalNotes = approvalNotes;
    }
}
