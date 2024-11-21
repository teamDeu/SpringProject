package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "e_resume_skills")
@Data
public class Eskill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "resume_id")
    private Resume resume;

    @ManyToOne
    @JoinColumn(name = "skill_id")
    private Skills skill;
}
