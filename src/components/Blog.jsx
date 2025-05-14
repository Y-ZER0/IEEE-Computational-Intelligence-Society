import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import '../ComponentsStyling/Blog.css'; 

const ModernBlog = ({ isDarkMode }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "AI's Creative Revolution",
      image: `${process.env.PUBLIC_URL}/images/Firefly blue and white ai robot in the future 52506.jpg`,
      description: "Coming soon...",
      category: "Innovation"
    },
    {
      id: 2,
      title: "Ethical AI Frontiers",
      image: `${process.env.PUBLIC_URL}/images/Firefly blue and white ai robot in the future 12670.jpg`,
      description: "Coming soon...",
      category: "Ethics"
    },
    {
      id: 3,
      title: "ML Transforming Healthcare",
      image: `${process.env.PUBLIC_URL}/images/Firefly blue and white ai robot in the future 98366.jpg`,
      description: "Coming soon...",
      category: "Healthcare"
    }
  ];

  const goToPrevious = () => {
    setActiveIndex(prevIndex => 
      prevIndex === 0 ? blogPosts.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex(prevIndex => 
      (prevIndex + 1) % blogPosts.length
    );
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      goToNext();
    } else if (touchEndX - touchStartX > 50) {
      goToPrevious();
    }
  };

  const isDesktopView = windowWidth >= 1024;
  const isTabletView = windowWidth >= 768 && windowWidth < 1024;

  return (
    <section 
      id="blog"
      className={`blog-section ${isDarkMode ? 'blog-dark-mode' : 'blog-light-mode'}`}
    >
      <div className="blog-container">
        <div className="blog-header">
          <h2 className="blog-title">Latest AI Insights</h2>
          <div className="blog-subtitle">Explore the cutting edge of artificial intelligence</div>
          
          <div className="blog-nav-desktop">
            {!isDesktopView && (
              <div className="blog-pagination">
                {blogPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`blog-dot ${index === activeIndex ? 'blog-dot-active' : ''}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
            
            <div className="blog-nav-buttons">
              <button
                onClick={goToPrevious}
                className="blog-nav-button"
                aria-label="Previous article"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={goToNext}
                className="blog-nav-button"
                aria-label="Next article"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
        
        <div 
          className="blog-carousel-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="blog-carousel">
            {isDesktopView ? (
              <div className="blog-cards-desktop">
                {blogPosts.map((post, index) => (
                  <div 
                    key={post.id} 
                    className={`blog-card ${index === activeIndex ? 'blog-card-active' : ''}`}
                    onClick={() => goToSlide(index)}
                  >
                    <div className="blog-card-tag">{post.category}</div>
                    <div className="blog-card-image-container">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="blog-card-image"
                      />
                    </div>
                    <div className="blog-card-content">
                      <h3 className="blog-card-title">{post.title}</h3>
                      <p className="blog-card-description">{post.description}</p>
                      <div className="blog-card-footer">
                        <div className="blog-card-read-more">
                          Read More <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : isTabletView ? (
              <div 
                className="blog-cards-tablet"
                style={{ transform: `translateX(-${activeIndex * 50}%)` }}
              >
                {blogPosts.map((post) => (
                  <div key={post.id} className="blog-card">
                    <div className="blog-card-tag">{post.category}</div>
                    <div className="blog-card-image-container">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="blog-card-image"
                      />
                    </div>
                    <div className="blog-card-content">
                      <h3 className="blog-card-title">{post.title}</h3>
                      <p className="blog-card-description">{post.description}</p>
                      <div className="blog-card-footer">
                        <div className="blog-card-read-more">
                          Read More <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div 
                className="blog-cards-mobile"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {blogPosts.map((post) => (
                  <div key={post.id} className="blog-card">
                    <div className="blog-card-tag">{post.category}</div>
                    <div className="blog-card-image-container">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="blog-card-image"
                      />
                    </div>
                    <div className="blog-card-content">
                      <h3 className="blog-card-title">{post.title}</h3>
                      <p className="blog-card-description">{post.description}</p>
                      <div className="blog-card-footer">
                        <div className="blog-card-read-more">
                          Read More <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {!isDesktopView && (
            <>
              <button 
                onClick={goToPrevious}
                className="blog-mobile-nav blog-mobile-prev"
                aria-label="Previous article"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button 
                onClick={goToNext}
                className="blog-mobile-nav blog-mobile-next"
                aria-label="Next article"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
        
        {isDesktopView && (
          <div className="blog-pagination-desktop">
            {blogPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`blog-dot ${index === activeIndex ? 'blog-dot-active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ModernBlog;