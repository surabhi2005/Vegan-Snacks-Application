package com.examly.springapp.dto;

import java.time.LocalDateTime;

public class NotificationsDTO {

    private Long id;
    private Long userId;
    private String username;
    private String message;
    private String type;
    private boolean isRead;
    private LocalDateTime createdDate;
    private String priority;

    public NotificationsDTO() {}

    public NotificationsDTO(Long id, Long userId, String username, String message,
                            String type, boolean isRead, LocalDateTime createdDate, String priority) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.message = message;
        this.type = type;
        this.isRead = isRead;
        this.createdDate = createdDate;
        this.priority = priority;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public boolean isRead() { return isRead; }
    public void setRead(boolean read) { isRead = read; }

    public LocalDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDateTime createdDate) { this.createdDate = createdDate; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
}

