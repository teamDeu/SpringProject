package com.example.Backend.repository;

import com.example.Backend.model.Faq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FaqRepository extends JpaRepository<Faq, Long> {
    List<Faq> findByTarget(Faq.Target target);
    Faq findByTitleAndTarget(String title, Faq.Target target);
}
