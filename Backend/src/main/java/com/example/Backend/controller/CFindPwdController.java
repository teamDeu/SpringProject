package com.example.Backend.controller;

import com.example.Backend.model.Company;
import com.example.Backend.repository.CompanyRepository;
import com.example.Backend.service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/find-pwd-company")
@CrossOrigin(origins = "http://localhost:3000") // 프론트엔드 요청 허용
public class CFindPwdController {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private SmsService smsService;

    // 문자 인증 요청 DTO
    public static class PhoneRequest {
        private String phone;

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }
    }

    // 문자 인증 요청
    @PostMapping("/request-verification")
    public ResponseEntity<String> requestVerification(@RequestBody PhoneRequest phoneRequest) {
        String phone = phoneRequest.getPhone();
        String code = smsService.sendVerificationCode(phone);
        return ResponseEntity.ok("인증번호가 발송되었습니다.");
    }

    // 문자 인증 확인
    @PostMapping("/verify-code")
    public ResponseEntity<Boolean> verifyCode(@RequestParam String phone, @RequestParam String code) {
        boolean isVerified = smsService.verifyCode(phone, code);
        return ResponseEntity.ok(isVerified);
    }

    // 아이디와 전화번호로 비밀번호 찾기
    @GetMapping("/search")
    public ResponseEntity<String> findPasswordByIdAndPhone(@RequestParam String id, @RequestParam String phone) {
        Optional<Company> companyOptional = companyRepository.findByIdAndManagerPhone(id, phone);
        if (companyOptional.isPresent()) {
            return ResponseEntity.ok(companyOptional.get().getPwd()); // 비밀번호 반환
        } else {
            return ResponseEntity.badRequest().body("일치하는 회사 정보를 찾을 수 없습니다.");
        }
    }
}
