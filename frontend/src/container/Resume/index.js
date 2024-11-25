import React, { useState } from 'react';
import JobTopBar from '../../components/JobTopBar';
import ResumeForm from '../../container/Resume/ResumeForm';
import MyResume from '../../container/Resume/MyResume';

function Resume() {
    const [showResumeForm, setShowResumeForm] = useState(false);
    const [showMyResume, setShowMyResume] = useState(true);

    const handleResumeButtonClick = () => {
        setShowResumeForm(true);
        setShowMyResume(false);
    };

    const handleMyResumeClick = () => {
        setShowMyResume(true);
        setShowResumeForm(false); 
    };

    return (
        <div>
            
            {showMyResume && <MyResume onAddResumeClick={handleResumeButtonClick} />}
            {showResumeForm && <ResumeForm />} 
        </div>
    );
}

export default Resume;