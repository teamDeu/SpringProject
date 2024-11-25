package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
        name = "g_faqs",
        indexes = {
                @Index(name = "fk_g_faqs_title_target", columnList = "title, target")
        }
)
public class GFaqs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    // Foreign key fields
    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "target", nullable = false, length = 20)
    private Faq.Target target;

    @Column(name = "question", nullable = false, length = 255)
    private String question;

    @Column(name = "answer", nullable = false, columnDefinition = "TEXT")
    private String answer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "title", referencedColumnName = "title", insertable = false, updatable = false),
            @JoinColumn(name = "target", referencedColumnName = "target", insertable = false, updatable = false)
    })
    private Faq faq;
}
