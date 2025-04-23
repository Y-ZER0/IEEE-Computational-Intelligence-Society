import React from 'react';
import '../ComponentsStyling/GoalsAndObjectives.css'; 
import '../ComponentsStyling/ScrollAnimation.css'; 
import useScrollReveal from '../useScrollReveal'; 

const GoalsAndObjectives = () => {
  const [containerRef, containerVisible] = useScrollReveal(0.1);
  const [leftSectionRef, leftSectionVisible] = useScrollReveal(0.2);
  const [rightSectionRef, rightSectionVisible] = useScrollReveal(0.2);
  const [objectivesRef, objectivesVisible] = useScrollReveal(0.3);
  
  const [obj1Ref, obj1Visible] = useScrollReveal(0.1);
  const [obj2Ref, obj2Visible] = useScrollReveal(0.1);
  const [obj3Ref, obj3Visible] = useScrollReveal(0.1);
  const [obj4Ref, obj4Visible] = useScrollReveal(0.1);
  const [obj5Ref, obj5Visible] = useScrollReveal(0.1);
  
  const objRefs = [obj1Ref, obj2Ref, obj3Ref, obj4Ref, obj5Ref];
  const objVisibility = [obj1Visible, obj2Visible, obj3Visible, obj4Visible, obj5Visible];
  
  const objectives = [
    {
      title: 'Hands-on Exposure',
      icon: 'research-icon',
      description: 'Provide our volunteers with hands-on exposure to their respective fields.'
    },
    {
      title: 'Connections',
      icon: 'collaboration-icon',
      description: 'Build a big network for volunteers to connect, collaborate, and grow together.'
    },
    {
      title: 'Empowerment',
      icon: 'education-icon',
      description: 'Enhance the organization and usability of the community for our volunteers.'
    },
    {
      title: 'Skills Development',
      icon: 'ethics-icon',
      description: 'Foster the development and enhancement of their technical and soft skills.'
    },
    {
      title: 'Empower Innovation',
      icon: 'innovation-icon',
      description: 'Support startups and researchers in creating scalable, human-centric AI solutions.'
    }
  ];

  return (
    <div 
      className={`goals-container ${containerVisible ? 'revealed' : ''}`} 
      id="goals" 
      ref={containerRef}
    >
      <div className="goals-content">
        <div 
          className={`left-section scroll-reveal slide-right ${leftSectionVisible ? 'revealed' : ''}`}
          ref={leftSectionRef}
        >
          <div className="pattern-background">
            <img src={`${process.env.PUBLIC_URL}/images/GroupPhotoMain.jpg`} alt="AI Robot" className="group-image" />
          </div>
          <div className="setup-text">
            <h2>Thoughtful AI Planning</h2>
            <p>The future of AI requires deliberate foresight and ethical consideration.</p>
            <p>We must balance innovation with responsibility to ensure AI serves humanity's best interests.</p>
            <p>Also balancing responsibility to safeguard societal.</p>
          </div>
        </div>
        
        <div 
          className={`right-section scroll-reveal slide-left ${rightSectionVisible ? 'revealed' : ''}`}
          ref={rightSectionRef}
        >
          <h2>Our Goals</h2>
          <div 
            className="objectives-list"
            ref={objectivesRef}
          >
            {objectives.map((objective, index) => {
              const ref = objRefs[index];
              const isVisible = objVisibility[index];
              
              return (
                <div 
                  key={index} 
                  className={`objective-item scroll-reveal delay-${(index + 1) * 100} ${isVisible ? 'revealed' : ''}`}
                  ref={ref}
                >
                  <div className="icon-container">
                    <i className={`icon ${objective.icon}`}></i>
                  </div>
                  <div className="objective-content">
                    <h3>{objective.title}</h3>
                    <p>{objective.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsAndObjectives;