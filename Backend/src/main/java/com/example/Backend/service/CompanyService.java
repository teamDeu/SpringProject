package com.example.Backend.service;

import com.example.Backend.model.Company;
import com.example.Backend.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public List<Company> getAllCompany() {
        return companyRepository.findAll();
    }

    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }

    // 다른 비즈니스 로직 추가 가능

    // 아이디 중복 확인
    public  boolean isDuplicateId(String id) {
        return companyRepository.existsById(id);
    }

    // 기업 회원 등록
    public  void registerCompany(Company Company) {
        companyRepository.save(Company);
    }
    public boolean authenticate(String id, String pwd) {
        // 회사 정보 가져오기
        Company company = companyRepository.findById(id).orElse(null);
        if (company != null && company.getPwd().equals(pwd)) {
            return true; // 인증 성공
        }
        return false; // 인증 실패
    }
}

//테스트를 위한 주석