package com.example.Backend.repository;

import com.example.Backend.model.ReviewManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewManagerRepository extends JpaRepository<ReviewManager, Integer> {
}
