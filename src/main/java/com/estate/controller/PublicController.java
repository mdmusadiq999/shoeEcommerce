package com.estate.controller;

import com.estate.entity.OtpRequest;
import com.estate.entity.ProductEntity;
import com.estate.entity.UserDto;
import com.estate.entity.UsersEntity;
import com.estate.service.UserProductService;
import com.estate.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
public class PublicController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserProductService userProductService;

    @GetMapping("/hello")
    public String greet(){
        return "Hello World!!";
    }

    @PostMapping("/init-reg")
    public ResponseEntity<String> initiateRegistration(@RequestBody UsersEntity user){
        try{
           userService.initiateRegistration(user);
            return ResponseEntity.ok("OTP has been sent to " + user.getEmail());
        }catch (IllegalArgumentException ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send otp");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> completeRegistration(@RequestBody OtpRequest otpRequest) {
        try{
            boolean isVerified = userService.verifyOtp(otpRequest.getEmail(), otpRequest.getOtp());
            if (isVerified) {
                return ResponseEntity.ok("User verified and registered successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP or OTP expired.");
            }
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register user please check the otp");
        }
    }

    @PostMapping("/auth")
    public ResponseEntity<Map<String,Object>> login(@RequestBody UsersEntity user){
        try {
            String email = user.getEmail();
            String password = user.getPassword();

            return userService.loginUser(email, password);

        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("status", "error", "message", "An error occurred during login"));
        }
    }

    @GetMapping("getAllUsers")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<UserDto>> getAllUsers(){
        try{
            List<UserDto> allUsers = userService.getAllUsers();
            return ResponseEntity.ok(allUsers);
        }catch (Exception ex){
           ex.printStackTrace();
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("user/{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable int userId){
        try{
            UserDto user = userService.getUser(userId);
            if(user != null){
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }catch (Exception ex){
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("updateUser/{userId}")
    public ResponseEntity<String> updateUser(@RequestBody UsersEntity user, @PathVariable int userId){
        try{
            userService.updateUser(user,userId);
            return ResponseEntity.ok("{\"status\":\"Updated successfully!\"}");
        }catch (IllegalArgumentException ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }catch (Exception ex){
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update user");
        }
    }

    @DeleteMapping("deleteUser/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable int userId){
        try{
            userService.deleteUserById(userId);
            return ResponseEntity.ok("{\"status\":\"Deleted successfully!\"}");
        }catch (Exception ex){
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user");
        }
    }

    @PostMapping("/{userId}/addSelectedProducts")
    public ResponseEntity<String> addSelectedProductsToUser(
            @PathVariable int userId,
            @RequestBody List<ProductEntity> products
    ) {
        try {
            UsersEntity user = userService.getUserById(userId);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            userProductService.addSelectedProductsToUser(user, products);

            return ResponseEntity.ok("Selected products added to user successfully");
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add selected products");
        }
    }
    
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        try {
            userService.initiatePasswordReset(email);
            return ResponseEntity.ok("Password reset instructions have been sent to " + email);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request: " + ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to send password reset instructions: " + ex.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        String newPassword = request.get("newPassword");
        try {
            userService.resetPassword(email, otp, newPassword);
            return ResponseEntity.ok("Password reset successfully!");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to reset password.");
        }
    }

}
