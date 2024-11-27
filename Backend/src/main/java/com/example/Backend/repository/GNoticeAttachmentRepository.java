package com.example.Backend.repository;

import com.example.Backend.model.GNoticeAttachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GNoticeAttachmentRepository extends JpaRepository<GNoticeAttachment, Integer> {
    List<GNoticeAttachment> findBygNotice_Id(Integer noticeId); //
}
