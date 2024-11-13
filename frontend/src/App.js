import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './container';
import Test from './container/test';
<<<<<<< HEAD
import Login from './container/log/login';
import Member from './container/log/member';
import Member2 from './container/log/member2';
import Findid from './container/log/findid';
import Findpwd from './container/log/findpwd';
import Rpwd from './container/log/rpwd';

=======
import Login from './container/login';
import Member from './container/member';
import Member2 from './container/member2';
import Findid from './container/findid';
import GlobalStyle from './GlobalStyles';
import GlobalFont from './GlobalFont';
import InputCompanyInfo from './container/inputCompanyInfo'
>>>>>>> 192e5820742e7543e303aa80cd333163df6ef123
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
<<<<<<< HEAD
            <Route path="findpwd" element={<Findpwd/>}/>
            <Route path="rpwd" element={<Rpwd/>}/>
=======
            <Route path="inputCompanyInfo" element ={<InputCompanyInfo/>}/>
>>>>>>> 192e5820742e7543e303aa80cd333163df6ef123
          </Routes>
        </BrowserRouter>
  );
}

export default App;
<<<<<<< HEAD
=======

  
>>>>>>> 192e5820742e7543e303aa80cd333163df6ef123
