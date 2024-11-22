package com.example.Backend.repository;

import com.example.Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByNameAndPhone(String name, String phone);
    Optional<User> findByIdAndPhone(String id, String phone);


}
