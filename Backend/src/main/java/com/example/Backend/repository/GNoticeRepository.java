package com.example.Backend.repository;

import com.example.Backend.model.GNotice;
import com.example.Backend.model.Notice;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GNoticeRepository extends JpaRepository<GNotice, Integer> {
    // id를 기준으로 내림차순으로 정렬된 GNotices 반환
    default List<GNotice> findAllSortedByIdDesc() {
        return findAll(Sort.by(Sort.Direction.DESC, "id"));
    }
    Optional<GNotice> findById(Integer id);
}
