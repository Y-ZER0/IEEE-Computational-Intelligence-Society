import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import HeroSection from './components/HeroSection';
import Header from './components/Header'; 
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

export const RouteContext = React.createContext({ currentRoute: '/' });

const HomePage = ({ toggleTheme, isDarkMode }) => {
  useEffect(() => {
    const sectionId = sessionStorage.getItem('scrollToSection');
    if (sectionId) {
      sessionStorage.removeItem('scrollToSection');
      
      setTimeout(() => {
        const targetSection = document.getElementById(sectionId);
        
        if (targetSection) {
          const headerHeight = document.querySelector('.main-header')?.offsetHeight || 100;
          const topOffset = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: topOffset,
            behavior: 'smooth'
          });
        }
      }, 500); 
    }
  }, []);

  return (
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
      <Blog isDarkMode={isDarkMode} />
      <WebMasters/> 
      <Footer isDarkMode={isDarkMode} />
    </>
  );
};

function AppContent() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const location = useLocation();
    
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const EventsPage = () => (
    <>
      <Header onToggleTheme={toggleTheme} isDarkMode={isDarkMode} currentPage="events" />
      <div className="page-spacer"></div> {/* Add spacing after header */}
      <AllEvents />
      <Footer isDarkMode={isDarkMode} currentRoute={location.pathname} />
    </>
  );

  return (
    <RouteContext.Provider value={{ currentRoute: location.pathname }}>
      <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
        <Routes>
          <Route path="/" element={<HomePage toggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />
          <Route path="/faq" element={<FAQ onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />
          <Route path="/all-events" element={<EventsPage />} />
        </Routes>
      </div>
    </RouteContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;