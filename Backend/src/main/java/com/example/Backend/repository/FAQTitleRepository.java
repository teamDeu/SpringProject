package com.example.Backend.repository;

import com.example.Backend.model.FAQTitle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FAQTitleRepository extends JpaRepository<FAQTitle, Long> {
}
