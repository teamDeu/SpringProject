import React, { useState } from 'react';
import JobTopBar from '../../components/JobTopBar';
import ResumeForm from '../../container/Resume/ResumeForm';

function JobPosting() {
    const [showResumeForm, setShowResumeForm] = useState(false);

    const handleResumeButtonClick = () => {
        setShowResumeForm(true);
    };

    return (
        <div>
            <JobTopBar onResumeClick={handleResumeButtonClick} />
            {showResumeForm ? <ResumeForm /> : null}
        </div>
    );
}

export default JobPosting;