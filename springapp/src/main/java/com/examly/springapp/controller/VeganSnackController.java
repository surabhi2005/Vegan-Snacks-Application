// package com.examly.springapp.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import com.examly.springapp.dto.VeganSnackDTO;
// // import com.examly.springapp.exception.InvalidExpiryException;
// import com.examly.springapp.model.VeganSnack;
// import com.examly.springapp.service.VeganSnackService;

// import java.util.List;
// @CrossOrigin(origins = "http://localhost:3000")
// @RestController
// @RequestMapping("/snacks")
// public class VeganSnackController {

//     @Autowired
//     private VeganSnackService snacksService;
//     @PostMapping("/addVeganSnack")
//     public VeganSnackDTO saveSnack(@RequestBody VeganSnack snack) {
//         VeganSnack saved = snacksService.addSnack(snack);
//         return new VeganSnackDTO(
//                 saved.getId(),
//                 saved.getVendor() != null ? saved.getVendor().getId() : null,
//                 saved.getVendor() != null ? saved.getVendor().getBusinessName() : null,
//                 saved.getSnackName(),
//                 saved.getSnackType(),
//                 saved.getDescription(),
//                 saved.getIngredients(),
//                 saved.getNutritionalInfo(),
//                 saved.getQuantity(),
//                 saved.getPrice(),
//                 saved.getExpiryInMonths(),
//                 saved.getSku(),
//                 saved.getStatus() != null ? saved.getStatus().name() : null,
//                 saved.getCreatedDate(),
//                 saved.getLastModified(),
//                 saved.getApprovedBy() != null ? saved.getApprovedBy().getId() : null,
//                 saved.getApprovedBy() != null ? saved.getApprovedBy().getUsername() : null,
//                 saved.getApprovalDate()
//         );
//     }
//      @GetMapping("/getbyvendorid/{vendorId}")
//     public List<VeganSnackDTO> getSnacksByVendor(@PathVariable Long vendorId) {
//         return snacksService.getSnacksByVendorId(vendorId);
//     }

//     @GetMapping("/getAllVeganSnacks")
//     public List<VeganSnackDTO> getAllSnacks() {
//         return snacksService.getSnacks();
//     }
  
//     @PutMapping("/update/{id}")
//     public VeganSnackDTO updateSnack(@PathVariable Long id, @RequestBody VeganSnack snack) {
//         return snacksService.updateSnack(id, snack);
//     }

//     @DeleteMapping("/delete/{id}")
//     public String deleteSnack(@PathVariable Long id) {
//         return snacksService.deleteSnack(id);
//     }
// }
package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.dto.VeganSnackDTO;
import com.examly.springapp.model.Users;
// import com.examly.springapp.exception.InvalidExpiryException;
import com.examly.springapp.model.VeganSnack;
import com.examly.springapp.service.VeganSnackService;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/snacks")
public class VeganSnackController {

    @Autowired
    private VeganSnackService snacksService;
    @PostMapping("/addVeganSnack")
    public VeganSnackDTO saveSnack(@RequestBody VeganSnack snack) {
        VeganSnack saved = snacksService.addSnack(snack);
        return new VeganSnackDTO(
                saved.getId(),
                saved.getVendor() != null ? saved.getVendor().getId() : null,
                saved.getVendor() != null ? saved.getVendor().getBusinessName() : null,
                saved.getSnackName(),
                saved.getSnackType(),
                saved.getDescription(),
                saved.getIngredients(),
                saved.getNutritionalInfo(),
                saved.getQuantity(),
                saved.getPrice(),
                saved.getExpiryInMonths(),
                saved.getSku(),
                saved.getStatus() != null ? saved.getStatus().name() : null,
                saved.getCreatedDate(),
                saved.getLastModified(),
                saved.getApprovedBy() != null ? saved.getApprovedBy().getId() : null,
                saved.getApprovedBy() != null ? saved.getApprovedBy().getUsername() : null,
                saved.getApprovalDate()
        );
    }
     @GetMapping("/getbyvendorid/{vendorId}")
    public List<VeganSnackDTO> getSnacksByVendor(@PathVariable Long vendorId) {
        return snacksService.getSnacksByVendorId(vendorId);
    }

    @GetMapping("/getAllVeganSnacks")
    public List<VeganSnackDTO> getAllSnacks() {
        return snacksService.getSnacks();
    }
  
    @PutMapping("/update/{id}")
    public VeganSnackDTO updateSnack(@PathVariable Long id, @RequestBody VeganSnack snack) {
        return snacksService.updateSnack(id, snack);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteSnack(@PathVariable Long id) {
        return snacksService.deleteSnack(id);
    }
      @GetMapping("/countByStatus")
    public long countSnacksByStatus(@RequestParam VeganSnack.SnackStatus status) {
        return snacksService.countSnacksByStatus(status);
    }

    // Get all pending approval snacks
    @GetMapping("/pending")
    public List<VeganSnackDTO> getPendingSnacks() {
        return snacksService.getPendingSnacks();
    }

    @PutMapping("/approve/{id}")
    public VeganSnackDTO approveSnack(@PathVariable Long id, @RequestParam Long approvedByUserId) {
        Users admin = new Users();
        admin.setId(approvedByUserId);
        return snacksService.approveSnack(id, admin);
    }

    // Check if a snack has passed QC (Approved)
@GetMapping("/checkQCStatus/{snackId}")
public boolean checkQCStatus(@PathVariable Long snackId) {
    return snacksService.checkQCStatus(snackId);
}


    // Reject a snack (Admin)
    @PutMapping("/reject/{id}")
    public VeganSnackDTO rejectSnack(
            @PathVariable Long id,
            @RequestParam Long approvedByUserId,
            @RequestParam String notes
    ) {
        Users admin = new Users();
        admin.setId(approvedByUserId);
        return snacksService.rejectSnack(id, admin, notes);
    }
}