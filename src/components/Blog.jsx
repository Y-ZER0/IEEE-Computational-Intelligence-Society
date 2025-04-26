import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../ComponentsStyling/Blog.css'; 

const Blog = ({ isDarkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const newsItems = [
    {
      id: 1,
      title: "AI's Creative Revolution",
      image: `${process.env.PUBLIC_URL}/images/Firefly blue and white ai robot in the future 52506.jpg`,
      description: "Coming soon..."
    },
    {
      id: 2,
      title: "Ethical AI Frontiers",
      image: `${process.env.PUBLIC_URL}/images/Firefly blue and white ai robot in the future 12670.jpg`,
      description: "Coming soon..."
    },
    {
      id: 3,
      title: "ML Transforming Healthcare",
      image: `${process.env.PUBLIC_URL}/images/Firefly blue and white ai robot in the future 98366.jpg`,
      description: "Coming soon..."
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % newsItems.length
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? newsItems.length - 1 : prevIndex - 1
    );
  };
  
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      handleNext();
    } else if (touchEndX - touchStartX > 50) {
      handlePrev();
    }
  };

  return (
    <section 
      className={`news-slider-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`} 
      id="blog"
    >
      <div className="news-slider-wrapper">
        <h2 className="text-4xl font-bold mb-12 text-center ai-insights-heading">
          Latest AI Insights
        </h2>
        
        <div 
          className="relative w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {isMobile ? (
            <div className="news-slider mobile-slider">
              <div className="news-slide">
                <div className={`news-card ${isDarkMode ? 'dark-card' : ''}`}>
                  <div className="news-image-container">
                    <img 
                      src={newsItems[currentIndex].image} 
                      alt={newsItems[currentIndex].title} 
                      className="news-image"
                    />
                    
                    <div className="news-hover-content">
                      <h3 className="hover-title">{newsItems[currentIndex].title}</h3>
                      <p className="hover-description">{newsItems[currentIndex].description}</p>
                    </div>
                  </div>

                  <div className="news-content">
                    <h3 className="news-title">{newsItems[currentIndex].title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div 
              className="news-slider" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {newsItems.map((news) => (
                <div key={news.id} className="news-slide">
                  <div className={`news-card ${isDarkMode ? 'dark-card' : ''}`}>
                    <div className="news-image-container">
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        className="news-image"
                      />
                      
                      <div className="news-hover-content">
                        <h3 className="hover-title">{news.title}</h3>
                        <p className="hover-description">{news.description}</p>
                      </div>
                    </div>

                    <div className="news-content">
                      <h3 className="news-title">{news.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <button 
            onClick={handlePrev}
            className="news-navigation left-4"
            aria-label="Previous slide"
          >
            <ChevronLeft className={`${isDarkMode ? 'text-gray-800' : 'text-[var(--primary-sky-blue)]'}`} />
          </button>
          
          <button 
            onClick={handleNext}
            className="news-navigation right-4"
            aria-label="Next slide"
          >
            <ChevronRight className={`${isDarkMode ? 'text-gray-800' : 'text-[var(--primary-sky-blue)]'}`} />
          </button>
        </div>
        
        <div className="news-pagination">
          {newsItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`news-dot ${index === currentIndex ? 'active' : ''} ${isDarkMode ? 'dark-dot' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;