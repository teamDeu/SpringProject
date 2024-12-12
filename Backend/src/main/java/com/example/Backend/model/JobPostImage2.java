package com.example.Backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@Table(name = "c_job_posts_img")
public class JobPostImage2 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false) // 외래키 설정
    @JsonBackReference
    private JobPost2 jobPost;

    @Column(name="img_name")
    private String imgName;

    @Column(name ="img_path")
    private String imgPath;


}
