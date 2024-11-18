package com.example.Backend.repository;

import com.example.Backend.model.Company;
import com.example.Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
public interface UserRepository extends JpaRepository<User, String> {
}
