package com.example.Backend.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "m_users")
public class User {

    @Id
    @Column(name = "id", length = 30, nullable = false)
    private String id;

    @Column(name = "email", unique = true, nullable = true, length = 255)
    private String email;

    @Column(name = "password", nullable = false)
    private String password = "TEMP_PASSWORD";

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "phone", length = 50)
    private String phone;

    @Column(name = "birth_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date birthDate = new Date(); // 현재 날짜 기본값

    @Column(name = "gender", columnDefinition = "ENUM('남', '여')")
    private String gender;

    @Column(name = "experience_level", columnDefinition = "ENUM('신입', '경력')")
    private String experienceLevel;

    @Column(name = "education_level", columnDefinition = "ENUM('고등학교', '대학교')")
    private String educationLevel;

    @Column(name = "education_status", columnDefinition = "ENUM('졸업', '중퇴', '재학')")
    private String educationStatus;

    @Column(name = "created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    @Column(name = "phone_verified", nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean phoneVerified = false;

    @Column(name = "kakao_id", unique = true, nullable = true)
    private String kakaoId; // 카카오 사용자 ID

    @Column(name = "profile_image", nullable = true, length = 500)
    private String profileImage; // 프로필 이미지 URL


    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getExperienceLevel() {
        return experienceLevel;
    }

    public void setExperienceLevel(String experienceLevel) {
        this.experienceLevel = experienceLevel;
    }

    public String getEducationLevel() {
        return educationLevel;
    }

    public void setEducationLevel(String educationLevel) {
        this.educationLevel = educationLevel;
    }

    public String getEducationStatus() {
        return educationStatus;
    }

    public void setEducationStatus(String educationStatus) {
        this.educationStatus = educationStatus;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getPhoneVerified() {
        return phoneVerified;
    }

    public void setPhoneVerified(Boolean phoneVerified) {
        this.phoneVerified = phoneVerified;
    }
}
