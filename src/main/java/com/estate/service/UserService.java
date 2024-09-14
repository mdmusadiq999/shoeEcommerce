package com.estate.service;

import com.estate.entity.UserDto;
import com.estate.entity.UsersEntity;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Map;

public interface UserService {
    void initiateRegistration(UsersEntity user);
    boolean verifyOtp(String email,String otp);
    ResponseEntity<Map<String, Object>> loginUser(String email, String password);
    void updateUser(UsersEntity user,int userId);
    void deleteUserById(int userId);
    UsersEntity getUserById(int userId);
    List<UserDto> getAllUsers();

    UserDto getUser(int userId);
    
    void initiatePasswordReset(String email);

    void resetPassword(String email, String otp, String newPassword);

}
