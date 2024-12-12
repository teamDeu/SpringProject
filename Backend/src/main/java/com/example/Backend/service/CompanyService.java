package com.example.Backend.service;

import com.example.Backend.model.Company;
import com.example.Backend.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public Optional<Company> getCompanyById(String id){
        return companyRepository.findById(id);
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
    public List<Map<String, Object>> getCompanyFavoriteCounts() {
        List<Object[]> results = companyRepository.getCompanyFavoriteCounts();
        System.out.println("Raw Results from DB: " + results); // 디버깅용 출력

        return results.stream().map(row -> {
            Map<String, Object> map = new HashMap<>();
            map.put("companyName", row[0]); // 회사 이름
            map.put("favoriteCount", row[1]); // 즐겨찾기 수
            map.put("ceoRegister", row[2]); // CEO 등록 정보
            map.put("ceoJob", row[3]); // CEO 직무
            map.put("ceoMent", row[4]); // CEO 멘트
            map.put("status", row[5]); // 등록 상태
            return map;
        }).collect(Collectors.toList());
    }
}

//테스트를 위한 주석