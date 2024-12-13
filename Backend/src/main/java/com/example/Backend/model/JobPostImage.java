package com.example.Backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "c_job_posts_img")
public class JobPostImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private Long id;

    @Column(name = "post_id") // 외래키 설정 및 중복 매핑 방지
    private Long postId;

    @Column(name="img_name")
    private String imgName;

    @Column(name ="img_path")
    private String imgPath;
}