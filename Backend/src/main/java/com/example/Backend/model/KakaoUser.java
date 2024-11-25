package com.example.Backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "kakao_users")
public class KakaoUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 고유 ID

    @Column(name = "kakao_id", unique = true, nullable = false)
    private String kakaoId; // 카카오 사용자 고유 ID

    @Column(name = "email", nullable = true)
    private String email; // 이메일 (account_email)

    @Column(name = "nickname", nullable = true)
    private String nickname; // 닉네임 (profile_nickname)

    @Column(name = "profile_image", nullable = true, length = 500)
    private String profileImage; // 프로필 이미지 URL (profile_image)

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = true)
    private User user; // 기존 User 엔티티와의 관계 (연결된 사용자)

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKakaoId() {
        return kakaoId;
    }

    public void setKakaoId(String kakaoId) {
        this.kakaoId = kakaoId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
