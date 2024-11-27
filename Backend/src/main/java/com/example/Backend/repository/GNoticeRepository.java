package com.example.Backend.repository;

import com.example.Backend.model.GNotice;
import com.example.Backend.model.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GNoticeRepository extends JpaRepository<GNotice, Integer> {
    List<GNotice> findByTitleAndTarget(String title, Notice.Target target);
}
