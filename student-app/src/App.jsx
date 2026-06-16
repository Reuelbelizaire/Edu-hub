import React from 'react';
import './App.css';
import { Card } from './Components/Card';
import logo from './assets/Website-Logo.png'; 
import mathImg from './assets/Deus_mathematics.png';
import scienceImg from './assets/science.png';
import computerScienceImg from './assets/CompSci.png';
import humanitiesImg from './assets/humanities.png';

import AboutMe from './AboutMe';
import Subject from './Subject';
import Math from './subjects/Math';
import Science from './subjects/Science';
import ComputerScience from './subjects/ComputerScience';
import Humanities from './subjects/Humanities';
// THE MISSING LINK THAT CRASHED YOUR APP:
import Login from './Login'; 

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  const subjects = [
    { id: 1, title: "Mathematics", icon: "📐", description: "Fill in later", link: "/subject/math", imgsrc: mathImg, imgalt: "Mathematics image" },
    { id: 2, title: "Science", icon: "📊", description: "Fill in later.", link: "/subject/science", imgsrc: scienceImg, imgalt: "Science image" },
    { id: 3, title: "Computer Science", icon: "💻", description: "Fill in later.", link: "/subject/ComputerScience", imgsrc: computerScienceImg, imgalt: "Computer Science image" },
    { id: 4, title: "Humanities", icon: "📖", description: "Fill in later.", link: "/subject/Humanities", imgsrc: humanitiesImg, imgalt: "Humanities image" }
  ];

  return (
    <>
      <header className="hero">
        <h1>Your all-in-one study lab</h1>
        <p className="description">
          A personalized platform designed to help students bridge the gap between resources and results.
        </p>
      </header>

      <section className="subject-section">
        <h2>Explore Subjects</h2>
        <div className="subject-grid">
          {subjects.map(sub => (
            <Card 
              key={sub.id} 
              title={sub.title} 
              icon={sub.icon} 
              description={sub.description} 
              link={sub.link}
              imgsrc={sub.imgsrc}
              imgalt={sub.imgalt}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="main-container">
        <nav className="navbar">
          <div className="logo-section">
            <img src={logo} alt="Edu-Sync Logo" className="nav-logo" />
            <span className="logo-text">Edu-Sync</span>
          </div>

          {/*navigation links */}
          <div className="nav-links">
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/subject" className="nav-item">Subjects</Link>
            <Link to="/AboutMe" className="nav-item">About</Link>
            <Link to="/Login" className="nav-item login-btn">Login</Link>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/AboutMe" element={<AboutMe />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/subject/math" element={<Math />} />
          <Route path="/subject/science" element={<Science />} />
          <Route path="/subject/computerScience" element={<ComputerScience />} />
          <Route path="/subject/humanities" element={<Humanities />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;