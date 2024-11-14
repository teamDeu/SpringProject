import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import JobPosting from './container/jobPosting';

import Home from './container';
import Test from './container/test';

import JobPosting from './container/jobPosting';


import Login from './container/log/login';
import Member from './container/log/member';
import Member2 from './container/log/member2';
import Findid from './container/log/findid';
import Findpwd from './container/log/findpwd';
import Rpwd from './container/log/rpwd';
import Basic from './container/log/basic';


import Admin from './container/admin';
import Amember from './container/admin/amember';
import Job from './container/admin/job';
import Faq from './container/admin/faq';
import Announcements from './container/admin/announcements';
import Areview from './container/admin/areview';

import GlobalStyle from './GlobalStyles';
import GlobalFont from './GlobalFont';
import InputCompanyInfo from './container/inputCompanyInfo'

function App() {

  return (
    
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <GlobalStyle/>
          <GlobalFont/>
          <Routes>
            <Route index element={<Home />} />
            <Route path="test" element={<Test />} />
            <Route path="login" element={<Login />} />
            <Route path="member" element={<Member/>}/>
            <Route path="member2" element={<Member2/>}/>
            <Route path="findid" element={<Findid/>}/>
            <Route path="admin" element={<Admin/>}/>
            <Route path="amember" element={<Amember/>}/>
            <Route path="job" element={<Job/>}/>
            <Route path="faq" element={<Faq />} />
            <Route path="announcements" element={<Announcements/>}/>
            <Route path="areview" element={<Areview/>}/>
            <Route path="jobposting" element={<JobPosting/>}/>
            <Route path="findpwd" element={<Findpwd/>}/>
            <Route path="rpwd" element={<Rpwd/>}/>
            <Route path="basic" element={<Basic/>}/>

            <Route path="inputCompanyInfo" element ={<InputCompanyInfo/>}/>
          </Routes>
        </BrowserRouter>
  );
}

export default App;

