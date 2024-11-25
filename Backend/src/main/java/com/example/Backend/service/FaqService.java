package com.example.Backend.service;

import com.example.Backend.model.Faq;
import com.example.Backend.repository.FaqRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FaqService {

    @Autowired
    private FaqRepository faqRepository;

    // 모든 Faq 조회
    public List<Faq> getAllFaqs() {
        return faqRepository.findAll();
    }

    // Target별 Faq 조회
    public List<Faq> getFaqsByTarget(String target) {
        return faqRepository.findByTarget(Faq.Target.valueOf(target));
    }

    // 새로운 Faq 생성
    public Faq createFaq(Faq faq) {
        return faqRepository.save(faq);
    }

    // 기존 Faq 업데이트
    public Faq updateFaq(Long id, Faq updatedFaq) {
        return faqRepository.findById(id).map(faq -> {
            faq.setTitle(updatedFaq.getTitle());
            faq.setTarget(updatedFaq.getTarget());
            return faqRepository.save(faq);
        }).orElseThrow(() -> new RuntimeException("Faq not found with id " + id));
    }

    // Faq 삭제
    public void deleteFaq(Long id) {
        faqRepository.deleteById(id);
    }
}
