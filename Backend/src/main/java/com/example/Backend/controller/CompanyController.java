package com.example.Backend.controller;

import com.example.Backend.model.Company;
import com.example.Backend.model.User;
import com.example.Backend.repository.CompanyRepository;
import com.example.Backend.service.CompanyService;
import com.example.Backend.service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // 특정 출처 허용
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private SmsService smsService;

    // DTO 클래스 정의
    public static class PhoneRequest {
        private String phone;

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }
    }

    public static class VerifyCodeRequest {
        private String phone;
        private String code;

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }
    }

    // 전체 회사 데이터 조회
    @GetMapping("/api/companies")
    public ResponseEntity<List<Company>> getData() {
        return ResponseEntity.ok(companyService.getAllCompany());
    }

    // 회사 정보 저장
    @PostMapping("/api/company")
    public ResponseEntity<Company> saveCompany(@RequestBody Company company) {
        Company savedCompany = companyService.saveCompany(company);
        return ResponseEntity.ok(savedCompany);
    }

    // 아이디 중복 확인
    @GetMapping("/check-duplicate_company")
    public ResponseEntity<String> checkDuplicate(@RequestParam String id) {
        boolean isDuplicate = companyService.isDuplicateId(id);
        if (isDuplicate) {
            return ResponseEntity.badRequest().body("아이디가 이미 존재합니다.");
        }
        return ResponseEntity.ok("아이디 사용 가능");
    }

    // 기업 회원 등록
    @PostMapping("/api/register_company")
    public ResponseEntity<String> registerCompany(@RequestBody Company company) {
        try {
            System.out.println("Received Company: " + company);
            companyService.saveCompany(company);
            return ResponseEntity.ok("기업 회원가입 성공");
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("기업 회원가입 실패: " + e.getMessage());
        }
    }

    // 전화번호 인증번호 요청
    @PostMapping("/api/request_company")
    public ResponseEntity<String> requestVerification(@RequestBody PhoneRequest phoneRequest) {
        String phone = phoneRequest.getPhone();
        if (phone == null || phone.isEmpty()) {
            return ResponseEntity.badRequest().body("전화번호를 입력해주세요.");
        }
        String verificationCode = smsService.sendVerificationCode(phone);
        return ResponseEntity.ok("인증번호가 발송되었습니다.");
    }

    // 인증번호 확인
    @PostMapping("/api/verify-code_company")
    public ResponseEntity<String> verifyCode(@RequestBody VerifyCodeRequest verifyCodeRequest) {
        String phone = verifyCodeRequest.getPhone();
        String code = verifyCodeRequest.getCode();

        if (phone == null || code == null || phone.isEmpty() || code.isEmpty()) {
            return ResponseEntity.badRequest().body("전화번호와 인증번호를 입력해주세요.");
        }

        boolean isVerified = smsService.verifyCode(phone, code);
        if (isVerified) {
            return ResponseEntity.ok("인증 성공");
        }
        return ResponseEntity.badRequest().body("인증 실패");
    }

    // 기업 회원 로그인 (경로: login_company)
    @PostMapping("/api/login_company")
    public ResponseEntity<String> loginCompany(@RequestBody Map<String, String> loginData) {
        String id = loginData.get("id");
        String pwd = loginData.get("pwd");

        try {
            boolean isAuthenticated = companyService.authenticate(id, pwd); // 인증 로직 호출
            if (isAuthenticated) {
                return ResponseEntity.ok("로그인 성공");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 잘못되었습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("로그인 실패: " + e.getMessage());
        }
    }
}
