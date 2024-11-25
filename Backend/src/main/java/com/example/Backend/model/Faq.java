package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
        name = "faq",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"title", "target"}, name = "unique_title_target")
        }
)
public class Faq {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "target", nullable = false, length = 20)
    private Target target;

    public enum Target {
        개인_FAQ,
        기업_FAQ
    }
}
