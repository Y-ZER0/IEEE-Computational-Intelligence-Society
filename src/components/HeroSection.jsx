import React from 'react';
import Header from './Header';
import HeroContent from './HeroContent';

function HeroSection({onToggleTheme, isDarkMode}) {
  return (
    <section className="hero" id="home">
      <Header onToggleTheme={onToggleTheme} isDarkMode={isDarkMode} currentPage="home" />
      <HeroContent />
    </section>
  );
}

export default HeroSection;