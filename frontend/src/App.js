import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './container';
import Test from './container/test';
import JobPosting from './container/jobPosting';

function App() {

  return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="test" element={<Test />} />
            <Route path="jobposting" element={<JobPosting />} />
          </Routes>
        </BrowserRouter>
  );
}

export default App;

