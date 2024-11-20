package com.example.Backend.controller;

import com.example.Backend.model.Company;
import com.example.Backend.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CompanyController {
    @Autowired
    CompanyService companyService = new CompanyService();


    @GetMapping("/api/companies")
    public ResponseEntity<List<Company>> getData() {
        // 데이터 반환 로직
        return ResponseEntity.ok(companyService.getAllCompany());
    }

    @PostMapping("/api/company")
    public ResponseEntity<Company> saveCompany(@RequestBody Company company) {
        // Company 객체 저장 로직
        Company savedCompany = companyService.saveCompany(company);
        return ResponseEntity.ok(savedCompany);
    }
}
