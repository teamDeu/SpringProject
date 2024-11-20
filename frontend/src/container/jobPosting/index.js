import React, { useState } from 'react';
import JobTopBar from '../../components/JobTopBar';
import JobSearch from '../../container/jobPosting/JobSearch';


function JobPosting() {
    const [showJobSearch, setShowJobSearch] = useState(false);

    const handleJobSearchClick = () => {
        setShowJobSearch(!showJobSearch);
    };

    return (
        <div>
            <JobTopBar onJobSearchClick={handleJobSearchClick} />
            {showJobSearch && <JobSearch />}
            
        </div>
    );
}

export default JobPosting;