package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CurrentTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@Data
@Table(name ="candidate")
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID 자동 생성
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "resume_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Resume resume;

    @ManyToOne
    @JoinColumn(name = "post_id", referencedColumnName = "id", insertable = false, updatable = false)
    private JobPost jobPost;

    @Column(name ="resume_id")
    private Integer resumeId;

    @Column(name ="post_id")
    private Long postId;

    @Column(name = "extra_file")
    private String extraFile;

    @Column(name = "create_at")
    @CurrentTimestamp
    private LocalDateTime createAt;

    @Column(name = "pass_type")
    private String passType;
}
