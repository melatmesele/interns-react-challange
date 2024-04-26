// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActorsList from './ActorList';
import ActorDetails from './ActorDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ActorsList/>} />
        <Route exact path="/actor/:id" element={<ActorDetails/>} />
      </Routes>
    </Router>
  );
};

export default App;
