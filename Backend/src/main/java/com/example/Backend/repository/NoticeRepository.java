package com.example.Backend.repository;

import com.example.Backend.model.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Integer> {
    Optional<Notice> findByTitleAndTarget(String title, Notice.Target target);
}

