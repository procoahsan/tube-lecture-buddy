import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Topics from './Topics';
import MyState from './MyState';
import InterestSearch from './InterestSearch';
import Analytics from './Analytics';
import Translation from './Translation';
import Clipping from './Clipping';
import Content from './Content';

function App() {

  return (
    <MyState>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Home />} />
      </Route>
      <Route  path="/topics" element={< Topics />}></Route>
      <Route exact path='/search' element={< InterestSearch />}></Route>  
      <Route path = "/analytics" element={<Analytics />}></Route>
      <Route path = "/translation" element={<Translation />}></Route>
      <Route path = "/clipping" element={<Clipping />}></Route>
      <Route path = "/content" element={<Content />}></Route>
    </Routes>
  </BrowserRouter>
 </MyState>
  
  );
}

export default App;
