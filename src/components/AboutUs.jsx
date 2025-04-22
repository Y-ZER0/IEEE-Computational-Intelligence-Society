import React, { useEffect, useRef } from 'react';
import '../ComponentsStyling/AboutUs.css'; 

const AboutUsSection = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const contentRef = useRef(null);
  const highlightsRef = useRef([]);

  useEffect(() => {
    const observerOptions = { threshold: 0.2 };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);
    
    if (imageContainerRef.current) observer.observe(imageContainerRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    
    highlightsRef.current.forEach(item => {
      if (item) observer.observe(item);
    });
    
    return () => {
      if (imageContainerRef.current) observer.unobserve(imageContainerRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
      
      highlightsRef.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  const addToHighlightRefs = (el) => {
    if (el && !highlightsRef.current.includes(el)) {
      highlightsRef.current.push(el);
    }
  };

  return (
    <section className="about-us-section" id="about-us" ref={sectionRef}>
      <div className="about-us-container">
        <div 
          className="about-us-image-container animated-element" 
          ref={imageContainerRef}
        >
          <img 
            src={`${process.env.PUBLIC_URL}/images/GroupPhoto.jpeg`}
            alt="About Us Group"
            className="about-us-image"
          />
        </div>
        <div 
          className="about-us-content animated-element" 
          ref={contentRef}
        >
          <h2 className="about-us-title">About IEEE CIS UJ Society</h2>
          <p className="about-us-description">
            We are a student led club that belongs to the Institute of Electrical and Electronics Engineering (IEEE) Computer Society which is a world-leading organization dedicated to computer society and technology. This society is situated at the University of Jordan, the King Abdullah || School for information Technology Since 2017.
          </p>
          <div className="about-us-highlights">
            {[
              {
                title: "Research",
                description: "Driving innovative research in AI, machine learning, and intelligent systems."
              },
              {
                title: "Community",
                description: "Creating a supportive network of like-minded tech enthusiasts and researchers."
              },
              {
                title: "Innovation",
                description: "Transforming theoretical knowledge into practical, impactful solutions."
              }
            ].map((highlight, index) => (
              <div 
                className="highlight-item animated-element" 
                key={index}
                ref={addToHighlightRefs}
              >
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;