package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "review_manager")
public class ReviewManager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id", nullable = false, length = 50)
    private String userId;

    @Column(name = "review_id", nullable = false)
    private int reviewId;

    @Column(name = "status", nullable = false, length = 10)
    private String status;

}
