package com.example.Backend.service;

import com.example.Backend.model.Notice;
import com.example.Backend.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoticeService {

    @Autowired
    private NoticeRepository noticeRepository;

    // 모든 Notice 조회
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    // 특정 타겟의 Notice 조회
    public List<Notice> getNoticesByTarget(Notice.Target target) {
        return noticeRepository.findAll().stream()
                .filter(notice -> notice.getTarget() == target)
                .toList();
    }

    // 새로운 Notice 생성
    public Notice createNotice(Notice notice) {
        return noticeRepository.save(notice);
    }

    // 기존 Notice 업데이트
    public Notice updateNotice(Integer id, Notice updatedNotice) {
        return noticeRepository.findById(id).map(notice -> {
            notice.setTitle(updatedNotice.getTitle());
            notice.setTarget(updatedNotice.getTarget());
            return noticeRepository.save(notice);
        }).orElseThrow(() -> new RuntimeException("Notice not found with id " + id));
    }

    // Notice 삭제
    public void deleteNotice(Integer id) {
        if (!noticeRepository.existsById(id)) {
            throw new RuntimeException("Notice not found with id " + id);
        }
        noticeRepository.deleteById(id);
    }
    // title과 target으로 Notice 조회
    public Notice getNoticeByTitleAndTarget(String title, Notice.Target target) {
        return noticeRepository.findByTitleAndTarget(title, target)
                .orElse(null);
    }


}
