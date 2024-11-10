import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './container';
import Test from './container/test';


function App() {

  return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="test" element={<Test />} />
          </Routes>
        </BrowserRouter>
  );
}

export default App;

