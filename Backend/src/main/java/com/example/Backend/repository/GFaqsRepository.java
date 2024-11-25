package com.example.Backend.repository;

import com.example.Backend.model.GFaqs;
import com.example.Backend.model.Faq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GFaqsRepository extends JpaRepository<GFaqs, Long> {
    List<GFaqs> findByFaqIn(List<Faq> faqs);
}
