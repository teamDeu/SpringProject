package com.example.Backend.service;

import com.example.Backend.model.GFaqs;
import com.example.Backend.model.Faq;
import com.example.Backend.repository.GFaqsRepository;
import com.example.Backend.repository.FaqRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GFaqsService {

    @Autowired
    private GFaqsRepository gFaqsRepository;

    @Autowired
    private FaqRepository faqRepository;

    // 모든 GFaqs 조회
    public List<GFaqs> getAllGFaqs() {
        return gFaqsRepository.findAll();
    }

    // 특정 target에 속한 GFaqs 조회
    public List<GFaqs> getGFaqsByTarget(String target) {
        // target에 해당하는 모든 Faq 조회
        List<Faq> faqs = faqRepository.findByTarget(Faq.Target.valueOf(target));

        if (faqs.isEmpty()) {
            throw new RuntimeException("No Faqs found for target " + target);
        }

        // 조회된 모든 Faq에 속한 GFaqs 반환
        return gFaqsRepository.findByFaqIn(faqs);
    }



    // 새로운 GFaqs 생성
    public GFaqs createGFaqs(GFaqs gFaqs, Long faqId) {
        Faq faq = faqRepository.findById(faqId)
                .orElseThrow(() -> new RuntimeException("Faq not found with id " + faqId));
        gFaqs.setFaq(faq);
        return gFaqsRepository.save(gFaqs);
    }

    // 기존 GFaqs 업데이트
    public GFaqs updateGFaqs(Long id, GFaqs updatedGFaqs) {
        return gFaqsRepository.findById(id).map(gFaqs -> {
            gFaqs.setQuestion(updatedGFaqs.getQuestion());
            gFaqs.setAnswer(updatedGFaqs.getAnswer());
            // 필요시 Faq도 업데이트할 수 있음
            return gFaqsRepository.save(gFaqs);
        }).orElseThrow(() -> new RuntimeException("GFaqs not found with id " + id));
    }

    // GFaqs 삭제
    public void deleteGFaqs(Long id) {
        gFaqsRepository.deleteById(id);
    }
}
