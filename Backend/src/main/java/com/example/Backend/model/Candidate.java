package com.example.Backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
    @Column(name = "id")
    private Long id;

    @Column(name ="resume_id")
    private Long resumeId;

    @Column(name ="post_id")
    private Long postId;

    @Column(name = "extra_file")
    private String extraFile;

    @Column(name = "create_at")
    @CurrentTimestamp
    private LocalDateTime createAt;
}
