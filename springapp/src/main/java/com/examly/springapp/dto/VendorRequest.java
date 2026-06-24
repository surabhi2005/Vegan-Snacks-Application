package com.examly.springapp.dto;

import java.util.List;

import com.examly.springapp.model.Certifications;

public class VendorRequest {

    private Long userId;
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
     
    private List<Certifications> certifications;

    // Getters and Setters
      public List<Certifications> getCertifications() {
        return certifications;
    }
    public void setCertifications(List<Certifications> certifications) {
        this.certifications = certifications;
    }
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
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

    public String getBusinessDescription() {
        return businessDescription;
    }
    public void setBusinessDescription(String businessDescription) {
        this.businessDescription = businessDescription;
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
}
