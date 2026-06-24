package com.examly.springapp.controller;

import com.examly.springapp.dto.NotificationsDTO;
import com.examly.springapp.model.Notifications;
import com.examly.springapp.service.NotificationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/notifications")
public class NotificationsController {

    @Autowired
    private NotificationsService notificationsService;

    @PostMapping("/add")
    public NotificationsDTO saveNotification(@RequestBody Notifications notification) {
        return notificationsService.addNotification(notification);
    }
    @GetMapping("/user/{userId}")
public List<NotificationsDTO> getUserNotifications(@PathVariable Long userId) {
    return notificationsService.getNotificationsByUser(userId);
}


    @GetMapping("/get")
    public List<NotificationsDTO> getAllNotifications() {
        return notificationsService.getNotifications();
    }

    @PutMapping("/update/{id}")
    public NotificationsDTO modifyNotification(@PathVariable Long id, @RequestBody Notifications notification) {
        return notificationsService.updateNotification(id, notification);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteNotification(@PathVariable Long id) {
        return notificationsService.deleteNotification(id);
    }
}
