package com.examly.springapp.dto;

import java.time.LocalDateTime;

public class UsersDTO {
    private Long id;
    private String username;
    private String email;
    private String role;
    private String phoneNumber;
    private LocalDateTime createdDate;
    private boolean emailVerified;
    private boolean isActive;
    private LocalDateTime lastLogin;

    public UsersDTO(Long id, String username, String email, String role, String phoneNumber,
                    LocalDateTime createdDate, boolean emailVerified, boolean isActive, LocalDateTime lastLogin) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.phoneNumber = phoneNumber;
        this.createdDate = createdDate;
        this.emailVerified = emailVerified;
        this.isActive = isActive;
        this.lastLogin = lastLogin;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public LocalDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDateTime createdDate) { this.createdDate = createdDate; }
    public boolean isEmailVerified() { return emailVerified; }
    public void setEmailVerified(boolean emailVerified) { this.emailVerified = emailVerified; }
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
    public LocalDateTime getLastLogin() { return lastLogin; }
    public void setLastLogin(LocalDateTime lastLogin) { this.lastLogin = lastLogin; }
}
