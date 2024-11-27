package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(
        name = "g_notices",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"title", "target"}, name = "unique_title_target")
        },
        indexes = {
                @Index(name = "fk_g_notices_title_target", columnList = "title, target")
        }
)
public class GNotice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "target", nullable = false, length = 20)
    private Notice.Target target;

    @Column(name = "question", nullable = false, length = 255)
    private String question;

    @Column(name = "answer", nullable = false, columnDefinition = "TEXT")
    private String answer;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    // 관계 설정: Notice
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "title", referencedColumnName = "title", insertable = false, updatable = false),
            @JoinColumn(name = "target", referencedColumnName = "target", insertable = false, updatable = false)
    })
    private Notice notice;

    // 관계 설정: GNoticeAttachments
    @OneToMany(mappedBy = "gNotice", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GNoticeAttachment> attachments;

    // 관계 설정: GNoticeImages
    @OneToMany(mappedBy = "gNotice", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GNoticeImage> images;
}
