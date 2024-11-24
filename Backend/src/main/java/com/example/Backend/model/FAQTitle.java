package com.example.Backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
@Entity
@Table(name = "g_faqs_title")
public class FAQTitle {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "header", nullable = false)
    private String header;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "email")
    private String email;
}
