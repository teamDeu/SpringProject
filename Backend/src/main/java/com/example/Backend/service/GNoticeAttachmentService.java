package com.example.Backend.service;

import com.example.Backend.model.GNoticeAttachment;
import com.example.Backend.repository.GNoticeAttachmentRepository;
import com.example.Backend.repository.GNoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GNoticeAttachmentService {

    @Autowired
    private GNoticeAttachmentRepository attachmentRepository;

    @Autowired
    private GNoticeRepository gNoticeRepository;

    // 특정 GNotice의 모든 첨부파일 조회
    public List<GNoticeAttachment> getAttachmentsByGNoticeId(Integer noticeId) {
        return attachmentRepository.findBygNotice_Id(noticeId);
    }

    // 새로운 첨부파일 추가
    public GNoticeAttachment addAttachment(Integer noticeId, GNoticeAttachment attachment) {
        return gNoticeRepository.findById(noticeId).map(gNotice -> {
            attachment.setGNotice(gNotice);
            return attachmentRepository.save(attachment);
        }).orElseThrow(() -> new RuntimeException("GNotice not found with id " + noticeId));
    }

    // 첨부파일 삭제
    public void deleteAttachment(Integer id) {
        if (!attachmentRepository.existsById(id)) {
            throw new RuntimeException("Attachment not found with id " + id);
        }
        attachmentRepository.deleteById(id);
    }
}
