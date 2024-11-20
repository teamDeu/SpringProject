import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import JobPosting from './container/jobPosting';
import JobSearch from './container/jobPosting/JobSearch';
import JobDetail from './container/jobPosting/JobDetail';
import Resume from './container/Resume';
import MyResume from './container/Resume/MyResume';
import ResumeForm from './container/Resume/ResumeForm';
import EditResume from './container/Resume/EditResume';
import Main from './container/Main';
import PersonalMain from './container/Main/PersonalMain';

import Home from './container';
import Test from './container/test';
import Login from './container/log/login';
import Clogin from './container/clog/clogin'
import Member from './container/log/member';
import Member2 from './container/log/member2';
import Cmember from './container/clog/cmember';
import Cmember2 from './container/clog/cmember2';
import Findid from './container/log/findid';
import Cfindid from './container/clog/cfindid';
import Findpwd from './container/log/findpwd';
import Cfindpwd from './container/clog/cfindpwd';
import Rpwd from './container/log/rpwd';
import Crpwd from './container/clog/crpwd';
import Basic from './container/log/basic';
import Admin from './container/admin';
import Amember from './container/admin/amember';
import Job from './container/admin/job';
import Faq from './container/admin/faq';

import Announcements from './container/admin/announcements';
import Areview from './container/admin/areview';
import Faqwrite from './container/admin/faqwrite';
import Awrite from './container/admin/awrite';


import Mp1 from './container/mypage/mp1';
import Mp2 from "./container/mypage/mp2";
import Mp3 from "./container/mypage/mp3";
import Mp4 from "./container/mypage/mp4";
import Mp5 from "./container/mypage/mp5";
import Mp6 from "./container/mypage/mp6";
import GlobalStyle from './GlobalStyles';
import GlobalFont from './GlobalFont';
import Test_Review_Write from './container/yangji/test_review_write'
import Test_Review_Home from './container/yangji/test_review_home'
import Ceo_Review_Home from './container/yangji/ceo_review_home'
import Myreview from './container/yangji/myreview'

import InputCompanyInfo from './container/company/inputCompanyInfo'
import UserSearch from './container/company/UserSearch'
import CompanyManagePost from './container/company/CompanyManagePost'
import CompanyRegPost from './container/company/CompanyRegPost'
import CompanyManageCandidate from './container/company/CompanyManageCandidate'
import ManageCompanyInfo from './container/company/ManageCompanyInfo'

import SFAQ from './container/service/sfaq';
import SAnnouncements from './container/service/sannouncements';

function App() {
  

  return (
    
        <BrowserRouter basename={process.env.PUBLIC_URL }>
          <GlobalStyle/>
          <GlobalFont/>
          <Routes>
            <Route index element={<Home />} />
            <Route path="test" element={<Test />} />
            <Route path="login" element={<Login />} />
            <Route path="clogin" element={<Clogin/>}/>
            <Route path="member" element={<Member/>}/>
            <Route path="member2" element={<Member2/>}/>
            <Route path="cmember" element={<Cmember/>}/>
            <Route path="cmember2" element={<Cmember2/>}/>
            <Route path="findid" element={<Findid/>}/>
            <Route path="cfindid" element={<Cfindid/>}/>
            <Route path="findpwd" element={<Findpwd/>}/>
            <Route path="cfindpwd" element={<Cfindpwd/>}/>
            <Route path="job" element={<Job/>}/>
            <Route path="faq" element={<Faq />} />
            <Route path="amember" element={<Amember />} />
            <Route path="announcements" element={<Announcements/>}/>
            <Route path="areview" element={<Areview/>}/>
            <Route path="faqwrite" element={<Faqwrite/>}/>
            <Route path="Awrite" element={<Awrite/>}/>
            <Route path="main" element={<Main/>}/>
            <Route path="personalmain" element={<PersonalMain/>}/>
            <Route path="jobposting" element={<JobPosting/>}/>
            <Route path="/jobsearch" element={<JobSearchWrapper />}/>
            <Route path="/jobdetail/:jobId" element={<JobDetail />} />
            <Route path="resume" element={<Resume />} />
            <Route path="myresume" element={<MyResume />} />
            <Route path="resumeform" element={<ResumeForm />} />

            <Route path="/editresume/:id" element={<EditResume />} />
            <Route path="findpwd" element={<Findpwd/>}/>

            <Route path="rpwd" element={<Rpwd/>}/>
            <Route path="crpwd" element={<Crpwd/>}/>
            <Route path="basic" element={<Basic/>}/>
            <Route path="mp1" element={<Mp1/>}/>
            <Route path="mp2" element={<Mp2/>}/>
            <Route path="mp3" element={<Mp3/>}/>
            <Route path="mp4" element={<Mp4/>}/>
            <Route path="mp5" element={<Mp5/>}/>
            <Route path="mp6" element={<Mp6/>}/>
            <Route path="inputCompanyInfo" element ={<InputCompanyInfo/>}/>
            <Route path="test_review_home1" element={<Test_Review_Home />} />
            <Route path="test_review_home2" element={<Ceo_Review_Home />} />
            <Route path="test_review_home3" element={<Test_Review_Write />} />
            <Route path="myreview" element={<Myreview />} />
            <Route path="usersearch" element ={<UserSearch/>}/>
            <Route path="CompanyManagePost" element ={<CompanyManagePost/>}/>
            <Route path="CompanyRegPost" element ={<CompanyRegPost/>}/>
            <Route path="CompanyManageCandidate" element ={<CompanyManageCandidate/>}/>
            <Route path="ManageCompanyInfo" element ={<ManageCompanyInfo/>}/>
            <Route path="sfaq" element ={<SFAQ/>}/>
            <Route path="sannouncements" element ={<SAnnouncements/>}/>
          </Routes>
        </BrowserRouter>
        
  );
}

export default App;


function JobSearchWrapper() {
  const navigate = useNavigate();

  const handleJobSelect = (jobId) => {
    navigate(`/jobdetail/${jobId}`);
  };

  return <JobSearch onJobSelect={handleJobSelect} />;
}

