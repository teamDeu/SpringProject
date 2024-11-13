import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './container';
import Test from './container/test';
import Login from './container/login';
import Member from './container/member';
import Member2 from './container/member2';
import Findid from './container/findid';
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
            <Route path="inputCompanyInfo" element ={<InputCompanyInfo/>}/>
          </Routes>
        </BrowserRouter>
  );
}

export default App;

  