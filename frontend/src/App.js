import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './container';
import Test from './container/test';
import Login from './container/log/login';
import Member from './container/log/member';
import Member2 from './container/log/member2';
import Findid from './container/log/findid';
import Findpwd from './container/log/findpwd';
import Rpwd from './container/log/rpwd';

function App() {

  return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="test" element={<Test />} />
            <Route path="login" element={<Login />} />
            <Route path="member" element={<Member/>}/>
            <Route path="member2" element={<Member2/>}/>
            <Route path="findid" element={<Findid/>}/>
            <Route path="findpwd" element={<Findpwd/>}/>
            <Route path="rpwd" element={<Rpwd/>}/>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
