// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp_Login/SignUp';
import Login from './components/SignUp_Login/Login';
import Home from './components/Homepage/Home'; 
import Contact from './components/Homepage/Contact';
import About from './components/Homepage/About';
import Dashboard from './components/Homepage/Dashboard';
import SaveMember from './components/Homepage/Members/SaveMember'; 
import MemberHome from './components/Homepage/Members/MemberHome';
import TrainerHome from './components/Homepage/Trainers/TrainerHome'; 
import SaveTrainer from './components/Homepage/Trainers/SaveTrainer';
import UpdateMember from './components/Homepage/Members/UpdateMember';
import { fetchTrainers } from './services/api';
import { useDispatch } from 'react-redux';
import { updateTrainers } from './store/trainerReducer';

function App() {

  const dispatch = useDispatch();

  const handleFetchTrainersData = async () => {
    try {
      const response = await fetchTrainers();
      dispatch(updateTrainers(response));
    } catch (error) {
      console.error('Error fetching trainers:', error);
    }
  }

  useEffect(()=>{
    handleFetchTrainersData();
  },[])


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<SignUp />} /> 
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/dash" element={<Dashboard />} /> 
          <Route path="/members" element={<MemberHome />} />
          <Route path="/trainers" element={<TrainerHome />} />
          <Route path="/savemember" element={<SaveMember />} /> 
          <Route path="/savetrainer" element={<SaveTrainer />} /> 
          <Route path="/updatemember" element={<UpdateMember />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
