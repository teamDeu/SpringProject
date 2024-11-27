package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
        name = "notices",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"title", "target"}, name = "unique_title_target")
        }
)
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "target", nullable = false, length = 20)
    private Target target;

    public enum Target {
        전체,
        개인회원,
        기업회원
    }
}
