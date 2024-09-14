package com.estate.service;

import com.estate.entity.UserDto;
import com.estate.entity.UsersEntity;
import com.estate.exception.UserNotFoundException;
import com.estate.repo.UserRepo;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class UserServiceImp implements UserService{

    @Autowired
    private UserRepo userRepo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    private final JavaMailSender javaMailSender;

    private final ConcurrentMap<String, UsersEntity> temporaryUsers = new ConcurrentHashMap<>();

    public UserServiceImp(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Value("{spring.mail.username}")
    private String fromMail;

    public String generateOtp() {
        return String.valueOf(new Random().nextInt(9000) + 1000);
    }

    @Override
    @Transactional
    public void initiateRegistration(UsersEntity user) {
        try{
            if (userRepo.existsByUsername(user.getUsername())) {
                throw new IllegalArgumentException("Username already exists.");
            } else if (userRepo.existsByEmail(user.getEmail())) {
                throw new IllegalArgumentException("Email already exists.");
            } else if (userRepo.existsByMobile(user.getMobile())) {
                throw new IllegalArgumentException("Mobile number already exists.");
            }

            user.setPassword(encoder.encode(user.getPassword()));

            if(user.getRoles() == null || user.getRoles().isEmpty()){
                user.setRoles(Collections.singleton("ROLE_USER"));
            }

            String otp =generateOtp();
            user.setOtp(otp);
            user.setOtpExpiry(LocalDateTime.now().plusMinutes(3));

            temporaryUsers.put(user.getEmail(),user);

            sendOtpMail(user.getEmail(),otp);
        }catch (DataIntegrityViolationException ex){
            handleConstraintViolation(ex);
        }
    }

    public void sendOtpMail(String mail,String otp){
        try{
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setTo(mail);
            simpleMailMessage.setSubject("OTP code");
            simpleMailMessage.setText("Your otp code is:"+otp);

            javaMailSender.send(simpleMailMessage);
        }catch (Exception ex){
            ex.printStackTrace();
            throw new RuntimeException("Failed to send OTP email");
        }
    }

    @Override
    @Transactional
    public boolean verifyOtp(String email, String otp) {
        UsersEntity user = temporaryUsers.get(email);

        if(user!=null&&user.getOtp().equals(otp) && user.getOtpExpiry().isAfter(LocalDateTime.now())){
            user.setVerified(true);
            userRepo.save(user);
            temporaryUsers.remove(email);
            return true;
        }
        return false;
    }

    private void handleConstraintViolation(DataIntegrityViolationException ex) {
        if (ex.getCause() instanceof ConstraintViolationException constraintEx) {
            String errorMessage = constraintEx.getMessage();
            if (errorMessage.contains("Duplicate entry")) {
                if (errorMessage.contains("UK5hfh7984gbv6hj3eq9dxs1t84")) {
                    throw new IllegalArgumentException("Username already exists.");
                } else if(errorMessage.contains("UK6wjjmkbpi4nmww1n8geusjhd4")) {
                    throw new IllegalArgumentException("Email already exists");
                }else if(errorMessage.contains("UKf7ksqdksvt9x2u0cu4fcrccn9")) {
                    throw new IllegalArgumentException("Mobile number already exists");
                } else {
                    throw new IllegalArgumentException(errorMessage);
                }
            }
        }
        throw ex;
    }

    @Transactional
    public ResponseEntity<Map<String, Object>> loginUser(String email, String password) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(email, password));

            if (authentication.isAuthenticated()) {
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                UsersEntity authenticatedUser = userRepo.findByEmail(userDetails.getUsername());
                String token = jwtService.generateToken(email);

                if (authenticatedUser != null) {
                    int userId = authenticatedUser.getUserId();
                    String mailId = authenticatedUser.getEmail();
                    return ResponseEntity.ok(Map.of(
                            "status", "success",
                            "userId", userId,
                            "token", token,
                            "mailId", mailId
                    ));
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(Map.of("status", "error", "message", "Login failed, user not found!"));
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("status", "error", "message", "Login failed, check credentials!"));
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("status", "error", "message", "Login failed, check credentials!"));
        }
    }

    @Override
    public void updateUser(UsersEntity user, int userId) {
        try{
            UsersEntity oldUser = userRepo.findByUserId(userId);

            if (oldUser == null) throw new UserNotFoundException("User with ID " + userId + " not found");

            if(user.getUsername()!=null && !user.getUsername().isEmpty()){
                oldUser.setUsername(user.getUsername());
            }

            if(user.getPassword()!=null && !user.getPassword().isEmpty()){
                oldUser.setPassword(encoder.encode(user.getPassword()));
            }

            if(user.getEmail()!=null && !user.getEmail().isEmpty()){
                oldUser.setEmail(user.getEmail());
            }

            if(user.getMobile()!=null){
                oldUser.setMobile(user.getMobile());
            }

            if(user.getAddress()!=null && !user.getAddress().isEmpty()){
                oldUser.setAddress(user.getAddress());
            }
            if (user.getRoles() != null && !user.getRoles().isEmpty()) {
                oldUser.setRoles(user.getRoles());
            }
            userRepo.save(oldUser);
        }catch (DataIntegrityViolationException ex){
            handleConstraintViolation(ex);
        }
    }

    @Override
    @Transactional
    public void deleteUserById(int userId) {
        UsersEntity user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        userRepo.delete(user);
    }

    @Override
    public UsersEntity getUserById(int userId) {
        return userRepo.findById(userId).orElse(null);
    }

    @Override
    public List<UserDto> getAllUsers() {
        try{
            return userRepo.findAllUsersWithSpecificFields();
        }catch (Exception ex){
            throw new RuntimeException(ex);
        }
    }

    @Override
    public UserDto getUser(int userId) {
        try {
            return userRepo.findUserByUserId(userId);
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
    
    @Override
    @Transactional
    public void initiatePasswordReset(String email) {
        UsersEntity user = userRepo.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("No user found with the given email address.");
        }

        String otp = generateOtp();
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(10)); // OTP valid for 10 minutes

        userRepo.save(user);
        sendResetPasswordMail(user.getEmail(), otp);
    }

    @Override
    @Transactional
    public void resetPassword(String email, String otp, String newPassword) {
        UsersEntity user = userRepo.findByEmail(email);

        if (user != null && user.getOtp().equals(otp) && user.getOtpExpiry().isAfter(LocalDateTime.now())) {
            user.setPassword(encoder.encode(newPassword));
            user.setOtp(null);
            user.setOtpExpiry(null);
            userRepo.save(user);
        } else {
            throw new IllegalArgumentException("Invalid OTP or OTP expired.");
        }
    }

    private void sendResetPasswordMail(String mail, String otp) {
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setTo(mail);
            simpleMailMessage.setSubject("Reset Password Instructions");
            simpleMailMessage.setText("Use the following OTP to reset your password: " + otp);

            javaMailSender.send(simpleMailMessage);
        } catch (Exception ex) {
            ex.printStackTrace(); // Logs the stack trace for debugging
            throw new RuntimeException("Failed to send reset password email: " + ex.getMessage());
        }
    }


}
