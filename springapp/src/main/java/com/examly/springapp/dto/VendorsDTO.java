package com.examly.springapp.dto;

import java.time.LocalDateTime;

public class VendorsDTO {
    private Long id;
    private Long userId;
    private String username;
    private String businessName;
    private String businessLicenseNumber;
    private String taxId;
    private String businessAddress;
    private String businessPhone;
    private String businessEmail;
    private Integer establishedYear;
    private Integer yearsOfExperience;
    private String targetMarket;
    private String businessDescription;
    private String haccpCertificationNumber;
    private String fdaRegistrationNumber;
    private String approvalStatus;
    private String approvalNotes;
    private LocalDateTime approvalDate;
    private Long approvedById;
    private String approvedByName;

    public VendorsDTO(Long id, Long userId, String username, String businessName,
                      String businessLicenseNumber, String taxId, String businessAddress,
                      String businessPhone, String businessEmail, Integer establishedYear,
                      Integer yearsOfExperience, String targetMarket, String businessDescription,
                      String haccpCertificationNumber, String fdaRegistrationNumber,
                      String approvalStatus, String approvalNotes, LocalDateTime approvalDate,
                      Long approvedById, String approvedByName) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.businessName = businessName;
        this.businessLicenseNumber = businessLicenseNumber;
        this.taxId = taxId;
        this.businessAddress = businessAddress;
        this.businessPhone = businessPhone;
        this.businessEmail = businessEmail;
        this.establishedYear = establishedYear;
        this.yearsOfExperience = yearsOfExperience;
        this.targetMarket = targetMarket;
        this.businessDescription = businessDescription;
        this.haccpCertificationNumber = haccpCertificationNumber;
        this.fdaRegistrationNumber = fdaRegistrationNumber;
        this.approvalStatus = approvalStatus;
        this.approvalNotes = approvalNotes;
        this.approvalDate = approvalDate;
        this.approvedById = approvedById;
        this.approvedByName = approvedByName;
    }

    // Getters and Setters for all fields
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getBusinessName() { return businessName; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }

    public String getBusinessLicenseNumber() { return businessLicenseNumber; }
    public void setBusinessLicenseNumber(String businessLicenseNumber) { this.businessLicenseNumber = businessLicenseNumber; }

    public String getTaxId() { return taxId; }
    public void setTaxId(String taxId) { this.taxId = taxId; }

    public String getBusinessAddress() { return businessAddress; }
    public void setBusinessAddress(String businessAddress) { this.businessAddress = businessAddress; }

    public String getBusinessPhone() { return businessPhone; }
    public void setBusinessPhone(String businessPhone) { this.businessPhone = businessPhone; }

    public String getBusinessEmail() { return businessEmail; }
    public void setBusinessEmail(String businessEmail) { this.businessEmail = businessEmail; }

    public Integer getEstablishedYear() { return establishedYear; }
    public void setEstablishedYear(Integer establishedYear) { this.establishedYear = establishedYear; }

    public Integer getYearsOfExperience() { return yearsOfExperience; }
    public void setYearsOfExperience(Integer yearsOfExperience) { this.yearsOfExperience = yearsOfExperience; }

    public String getTargetMarket() { return targetMarket; }
    public void setTargetMarket(String targetMarket) { this.targetMarket = targetMarket; }

    public String getBusinessDescription() { return businessDescription; }
    public void setBusinessDescription(String businessDescription) { this.businessDescription = businessDescription; }

    public String getHaccpCertificationNumber() { return haccpCertificationNumber; }
    public void setHaccpCertificationNumber(String haccpCertificationNumber) { this.haccpCertificationNumber = haccpCertificationNumber; }

    public String getFdaRegistrationNumber() { return fdaRegistrationNumber; }
    public void setFdaRegistrationNumber(String fdaRegistrationNumber) { this.fdaRegistrationNumber = fdaRegistrationNumber; }

    public String getApprovalStatus() { return approvalStatus; }
    public void setApprovalStatus(String approvalStatus) { this.approvalStatus = approvalStatus; }

    public String getApprovalNotes() { return approvalNotes; }
    public void setApprovalNotes(String approvalNotes) { this.approvalNotes = approvalNotes; }

    public LocalDateTime getApprovalDate() { return approvalDate; }
    public void setApprovalDate(LocalDateTime approvalDate) { this.approvalDate = approvalDate; }

    public Long getApprovedById() { return approvedById; }
    public void setApprovedById(Long approvedById) { this.approvedById = approvedById; }

    public String getApprovedByName() { return approvedByName; }
    public void setApprovedByName(String approvedByName) { this.approvedByName = approvedByName; }
}
