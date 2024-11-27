package com.example.Backend.service;

import com.example.Backend.model.GNotice;
import com.example.Backend.model.Notice;
import com.example.Backend.repository.GNoticeRepository;
import com.example.Backend.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GNoticeService {

    @Autowired
    private GNoticeRepository gNoticeRepository;

    @Autowired
    private NoticeRepository noticeRepository;

    // 모든 GNotice 조회
    public List<GNotice> getAllGNotices() {
        return gNoticeRepository.findAll();
    }

    // 특정 타겟의 GNotice 조회
    public List<GNotice> getGNoticesByTarget(String target) {
        Notice.Target targetEnum;
        try {
            targetEnum = Notice.Target.valueOf(target);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid target: " + target);
        }
        return gNoticeRepository.findAll().stream()
                .filter(gNotice -> gNotice.getTarget() == targetEnum)
                .toList();
    }

    // 새로운 GNotice 생성
    public GNotice createGNotice(GNotice gNotice, Integer noticeId) {
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new RuntimeException("Notice not found with id " + noticeId));

        gNotice.setTitle(notice.getTitle());
        gNotice.setTarget(notice.getTarget());
        return gNoticeRepository.save(gNotice);
    }

    // 기존 GNotice 업데이트
    public GNotice updateGNotice(Integer id, GNotice updatedGNotice) {
        return gNoticeRepository.findById(id).map(gNotice -> {
            gNotice.setQuestion(updatedGNotice.getQuestion());
            gNotice.setAnswer(updatedGNotice.getAnswer());
            // 필요시 Notice 정보도 업데이트할 수 있음
            return gNoticeRepository.save(gNotice);
        }).orElseThrow(() -> new RuntimeException("GNotice not found with id " + id));
    }

    // GNotice 삭제
    public void deleteGNotice(Integer id) {
        if (!gNoticeRepository.existsById(id)) {
            throw new RuntimeException("GNotice not found with id " + id);
        }
        gNoticeRepository.deleteById(id);
    }
}
