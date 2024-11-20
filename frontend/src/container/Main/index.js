import React, { useState } from 'react';
import JobTopBar from '../../components/JobTopBar';
import PersonalMain from '../../container/Main/PersonalMain';



function Main() {


    return (
        <div>
            <JobTopBar />  
            <PersonalMain />       
        </div>
    );
}

export default Main;

