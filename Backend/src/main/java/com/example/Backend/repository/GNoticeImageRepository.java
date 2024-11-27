package com.example.Backend.repository;

import com.example.Backend.model.GNoticeImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GNoticeImageRepository extends JpaRepository<GNoticeImage, Integer> {
    List<GNoticeImage> findBygNotice_Id(Integer noticeId); // 동일하게 수정
}
