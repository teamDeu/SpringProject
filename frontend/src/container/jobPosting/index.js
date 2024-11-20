import React, { useState } from 'react';
import JobTopBar from '../../components/JobTopBar';
import JobSearch from '../../container/jobPosting/JobSearch';
import JobDetail from '../../container/jobPosting/JobDetail';


function JobPosting() {
    const [showJobDetail, setShowJobDetail] = useState(false); // JobDetail 표시 여부
    const [selectedJobId, setSelectedJobId] = useState(null); // 선택된 Job ID 저장

    const handleJobSelect = (id) => {
        setSelectedJobId(id);
        setShowJobDetail(true);
    };

    const handleBackToSearch = () => {
        setShowJobDetail(false);
        setSelectedJobId(null);
    };

    return (
        <div>
            <JobTopBar />
            {showJobDetail ? (
                <JobDetail jobId={selectedJobId} onBack={handleBackToSearch} />
            ) : (
                <JobSearch onJobSelect={handleJobSelect} />
            )}
        </div>
    );
}

export default JobPosting;

