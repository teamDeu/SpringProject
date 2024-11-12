import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './container';
import Test from './container/test';
import Login from './container/login';
import Member from './container/member';
import Member2 from './container/member2';
import Findid from './container/findid';

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
          </Routes>
        </BrowserRouter>
  );
}

export default App;

