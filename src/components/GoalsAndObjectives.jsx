import React, { useEffect, useState } from 'react';
import '../ComponentsStyling/GoalsAndObjectives.css'; // Import the CSS file for styling
import { FaHandsHelping } from 'react-icons/fa';
import { MdOutlineConnectWithoutContact, MdMenuBook } from 'react-icons/md';
import { GiPowerLightning } from 'react-icons/gi';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import { BsLightbulb } from 'react-icons/bs';

const GoalsAndObjectives = () => {
  const [isVisible, setIsVisible] = useState(false);

  const goals = [
    {
      icon: <FaHandsHelping />,
      title: "Hands-on Exposure",
      description: "Provide our volunteers with hands-on exposure to their respective fields."
    },
    {
      icon: <MdOutlineConnectWithoutContact />,
      title: "Connections",
      description: "Build a big network for volunteers to connect, collaborate, and grow together."
    },
    {
      icon: <MdMenuBook />,
      title: "Empowerment",
      description: "Enhance the organization and usability of the community for our volunteers."
    },
    {
      icon: <AiFillSafetyCertificate />,
      title: "Skills Development",
      description: "Foster the development and enhancement of their technical and soft skills."
    },
    {
      icon: <BsLightbulb />,
      title: "Empower Innovation",
      description: "Support startups and researchers in creating scalable, human-centric AI solutions."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('.goals-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section className={`goals-section ${isVisible ? 'visible' : ''}`}>
      <div className="goals-container">
        <div className={`goals-heading ${isVisible ? 'animate-in' : ''}`}>
          <h2 className="title" >Our Goals</h2>
          <div className="title-underline"></div>
        </div>

        <div className="goals-wrapper">
          <div className={`goals-left ${isVisible ? 'animate-in' : ''}`}>
            <div className="goals-image-container">
              {/* Using a direct path to the image */}
              <img src="/images/GroupPhotoMain.jpg" alt="IEEE CIS JU Team" className="goals-image" />
            </div>
            
            <div className="ai-planning-card">
              <h3>Thoughtful AI Planning</h3>
              <p>The future of AI requires deliberate foresight and ethical consideration.</p>
              <p>We must balance innovation with responsibility to ensure AI serves humanity's best interests.</p>
              <p>Also balancing responsibility to safeguard societal welfare.</p>
            </div>
          </div>
          
          <div className="goals-right">
            <div className="goals-list">
              {goals.map((goal, index) => (
                <div className="goal-item" key={index}>
                  <div className="goal-icon-container">
                    <div className="goal-icon">
                      {goal.icon}
                    </div>
                    <div className="timeline-line"></div>
                  </div>
                  <div className="goal-content">
                    <h3 className="goal-title">{goal.title}</h3>
                    <p className="goal-description">{goal.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsAndObjectives;