import React, { useState } from 'react';
import useScrollReveal from '../useScrollReveal'; 

const TeamLeaderCard = ({ leaderName, leaderImage, leaderSpecialization, cardRef, cardVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`team-leader-image-container scroll-reveal zoom-in ${cardVisible ? 'revealed' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={cardRef}
    >
      <img 
        src={leaderImage || `${process.env.PUBLIC_URL}/images/Firefly blue and white ai robot in the future 98366.jpg`}
        alt={`${leaderName}`} 
        className="team-leader-image"
      />
      
      {isHovered && (
        <div className="team-leader-hover-overlay">
          <h3 className="leader-name">{leaderName}</h3>
          <p className="leader-specialization">{leaderSpecialization}</p>
        </div>
      )}
    </div>
  );
};

const TeamContainer = ({ 
  title, 
  leaders = [], 
  description, 
  icon: Icon, 
  primaryColor, 
  secondaryColor,
  hoverIntensity = 1,
  slideDirection = 'right'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [titleRef, titleVisible] = useScrollReveal(0.2);
  const [descRef, descVisible] = useScrollReveal(0.3);
  
  const [leader1Ref, leader1Visible] = useScrollReveal(0.15);
  const [leader2Ref, leader2Visible] = useScrollReveal(0.15);
  
  const leaderRefs = [leader1Ref, leader2Ref];
  const leaderVisibility = [leader1Visible, leader2Visible];

  let hoverPosition;
  
  switch (slideDirection) {
    case 'right':
      hoverPosition = isHovered ? `${100 * hoverIntensity}% 50%` : '0% 50%';
      break;
    case 'left':
      hoverPosition = isHovered ? `${-100 * hoverIntensity}% 50%` : '0% 50%';
      break;
    case 'top':
      hoverPosition = isHovered ? `50% ${-100 * hoverIntensity}%` : '50% 0%';
      break;
    case 'bottom':
      hoverPosition = isHovered ? `50% ${100 * hoverIntensity}%` : '50% 0%';
      break;
    case 'top-right':
      hoverPosition = isHovered ? `${100 * hoverIntensity}% ${-100 * hoverIntensity}%` : '0% 0%';
      break;
    case 'top-left':
      hoverPosition = isHovered ? `${-100 * hoverIntensity}% ${-100 * hoverIntensity}%` : '0% 0%';
      break;
    case 'bottom-right':
      hoverPosition = isHovered ? `${100 * hoverIntensity}% ${100 * hoverIntensity}%` : '0% 0%';
      break;
    case 'bottom-left':
      hoverPosition = isHovered ? `${-100 * hoverIntensity}% ${100 * hoverIntensity}%` : '0% 0%';
      break;
    default:
      hoverPosition = isHovered ? `${100 * hoverIntensity}% 50%` : '0% 50%';
  }

  return (
    <div 
      className="team-container"
      style={{
        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
        backgroundSize: '400% 400%', 
        backgroundPosition: hoverPosition,
        transition: 'all 1.3s ease' 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`team-header scroll-reveal ${titleVisible ? 'revealed' : ''}`}
        ref={titleRef}
      >
        <h2 className="team-title">{title}</h2>
        <Icon className="team-icon" size={32} />
      </div>
      
      <div className={`team-leaders-grid ${leaders.length > 1 ? "multiple-leaders" : ""}`}>
        {leaders.map((leader, index) => {
          const ref = index < 2 ? leaderRefs[index] : null;
          const isVisible = index < 2 ? leaderVisibility[index] : false;
          
          return (
            <TeamLeaderCard 
              key={index}
              leaderName={leader.name}
              leaderImage={leader.image}
              leaderSpecialization={leader.specialization}
              cardRef={ref}
              cardVisible={isVisible}
            />
          );
        })}
      </div>

      <div 
        className={`team-description-container scroll-reveal ${descVisible ? 'revealed' : ''}`}
        ref={descRef}
      >
        <p className="team-description">{description}</p>
      </div>
    </div>
  );
};

export default TeamContainer;