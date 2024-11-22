package com.example.Backend.service;

import com.example.Backend.model.User;
import com.example.Backend.model.Company;
import com.example.Backend.repository.UserRepository;
import com.example.Backend.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MemberService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    public MemberService(UserRepository userRepository, CompanyRepository companyRepository) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }

    public Map<String, List<Map<String, Object>>> getAllMembers() {
        List<User> users = userRepository.findAll();
        List<Company> companies = companyRepository.findAll();

        List<Map<String, Object>> individuals = new ArrayList<>();
        List<Map<String, Object>> corporate = new ArrayList<>();

        // 개인 데이터 가공
        for (User user : users) {
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", user.getId());
            userData.put("type", "개인");
            userData.put("password", user.getPassword());
            userData.put("name", user.getName());
            userData.put("dob", user.getBirthDate());
            userData.put("phone", user.getPhone());
            individuals.add(userData);
        }

        // 기업 데이터 가공
        for (Company company : companies) {
            Map<String, Object> companyData = new HashMap<>();
            companyData.put("id", company.getId());
            companyData.put("type", "기업");
            companyData.put("password", company.getPwd());
            companyData.put("name", company.getCompanyName());
            companyData.put("dob", null); // 기업에는 생년월일이 없음
            companyData.put("phone", company.getManagerPhone());
            corporate.add(companyData);
        }

        Map<String, List<Map<String, Object>>> allMembers = new HashMap<>();
        allMembers.put("individuals", individuals);
        allMembers.put("companies", corporate);

        return allMembers;
    }
}
