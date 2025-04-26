import React from 'react';
import Header from './Header';

function HeroSection({onToggleTheme, isDarkMode, minimal = false, currentPage = "home"}) {
  return (
    <section className={`hero ${minimal ? 'minimal' : ''}`} id={currentPage === "home" ? "home" : ""}>
      <Header onToggleTheme={onToggleTheme} isDarkMode={isDarkMode} currentPage={currentPage} />
    </section>
  );
}

export default HeroSection;