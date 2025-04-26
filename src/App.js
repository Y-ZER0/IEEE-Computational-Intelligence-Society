import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';
import MissionAndVision from './components/MissionAndVision';
import GoalsAndObjectives from './components/GoalsAndObjectives';
import IEEECISStats from './components/IEEECISStats'; 
import LeadershipSection from './components/LeadershipSection';
import TeamsSection from './components/TeamsSection';
import StarsOfMonth from './components/StarsOfMonth'; 
import WebMasters from './components/WebMasters'; 
import EventsWorkshops from './components/EventsWorkshops';
import Blog from './components/Blog';
import Footer from './components/Footer';
import FAQ from "./components/FAQ";
import AllEvents from './components/AllEvents'; 
 
function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
    
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const HomePage = () => (
    <>
      <HeroSection onToggleTheme={toggleTheme} isDarkMode={isDarkMode} currentPage="home" />
      <AboutUs />
      <MissionAndVision/>
      <GoalsAndObjectives/>
      <IEEECISStats />
      <LeadershipSection /> 
      <TeamsSection/>
      <StarsOfMonth isDarkMode={isDarkMode} /> 
      <EventsWorkshops limit={6} showExploreMore={true} /> 
      <Blog/>
      <WebMasters/> 
      <Footer isDarkMode={isDarkMode} />
    </>
  );

  const EventsPage = () => (
    <>
      <HeroSection onToggleTheme={toggleTheme} isDarkMode={isDarkMode} minimal={true} currentPage="events" />
      <AllEvents />
      <Footer isDarkMode={isDarkMode} />
    </>
  );

  return (
    <Router>
      <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FAQ onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />
          <Route path="/all-events" element={<EventsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;