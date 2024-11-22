package com.example.Backend.service;

import com.example.Backend.model.InterviewReview;
import com.example.Backend.repository.InterviewReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterviewReviewService {

    @Autowired
    private InterviewReviewRepository interviewReviewRepository;

    public List<InterviewReview> getAllInterviewReviews() {
        return interviewReviewRepository.findAll();
    }

    public List<Object[]> getInterviewReviewsWithDetails() {
        return interviewReviewRepository.getInterviewReviewsWithDetails();
    }



    public InterviewReview saveInterviewReview(InterviewReview interviewReview) {
        return interviewReviewRepository.save(interviewReview);
    }
}
