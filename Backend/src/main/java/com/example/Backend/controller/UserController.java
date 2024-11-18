package com.example.Backend.controller;

import com.example.Backend.model.User;
import com.example.Backend.service.SmsService;
import com.example.Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private SmsService smsService;

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        userService.registerUser(user);
        return ResponseEntity.ok("회원가입 성공");
    }

    // 전화번호 인증번호 요청
    @PostMapping("/request-verification")
    public ResponseEntity<String> requestVerification(@RequestParam String phone) {
        System.out.println("Received Phone: " + phone); // 로그 추가
        String verificationCode = smsService.sendVerificationCode(phone);
        return ResponseEntity.ok("인증번호가 발송되었습니다.");
    }


    // 인증번호 확인
    @PostMapping("/verify-code")
    public ResponseEntity<String> verifyCode(@RequestParam String phone, @RequestParam String code) {
        boolean isVerified = smsService.verifyCode(phone, code);
        if (isVerified) {
            return ResponseEntity.ok("인증 성공");
        } else {
            return ResponseEntity.badRequest().body("인증 실패");
        }
    }
}
