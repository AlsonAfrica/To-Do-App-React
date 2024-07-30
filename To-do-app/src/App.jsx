import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';

const App = () => {
  return ( 
    <Router>
      <Routes>
      <Route path = "/" element ={<LoginPage />} />
      <Route path = "/HomePage" element ={<HomePage />} />
      
      </Routes>
   </Router>
    
   );
}
 
export default App;
