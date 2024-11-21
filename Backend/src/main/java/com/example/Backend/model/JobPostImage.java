package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@ToString
@Table(name = "c_job_posts_img")
public class JobPostImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false) // 외래키 설정
    private JobPost jobPost;

    @Column(name="img_name")
    private String imgName;

    @Column(name ="img_path")
    private String imgPath;


}
