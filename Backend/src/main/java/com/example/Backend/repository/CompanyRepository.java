package com.example.Backend.repository;

import com.example.Backend.model.Company;
import com.example.Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String> {
    Optional<Company> findByManagerNameAndManagerPhone(String managerName, String managerPhone);
    Optional<Company> findByIdAndManagerPhone(String id, String managerPhone);
}