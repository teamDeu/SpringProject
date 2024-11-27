package com.example.Backend.service;

import com.example.Backend.model.GNoticeImage;
import com.example.Backend.repository.GNoticeImageRepository;
import com.example.Backend.repository.GNoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GNoticeImageService {

    @Autowired
    private GNoticeImageRepository imageRepository;

    @Autowired
    private GNoticeRepository gNoticeRepository;

    // 특정 GNotice의 모든 이미지 조회
    public List<GNoticeImage> getImagesByGNoticeId(Integer noticeId) {
        return imageRepository.findBygNotice_Id(noticeId);
    }

    // 새로운 이미지 추가
    public GNoticeImage addImage(Integer noticeId, GNoticeImage image) {
        return gNoticeRepository.findById(noticeId).map(gNotice -> {
            image.setGNotice(gNotice);
            return imageRepository.save(image);
        }).orElseThrow(() -> new RuntimeException("GNotice not found with id " + noticeId));
    }

    // 이미지 삭제
    public void deleteImage(Integer id) {
        if (!imageRepository.existsById(id)) {
            throw new RuntimeException("Image not found with id " + id);
        }
        imageRepository.deleteById(id);
    }
}
