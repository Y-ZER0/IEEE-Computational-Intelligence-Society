import React from 'react';
import { 
  Users, 
  Code, 
  Instagram, 
  Megaphone 
} from 'lucide-react';
import '../ComponentsStyling/TeamsSection.css';
import '../ComponentsStyling/ScrollAnimation.css'; 
import TeamContainer from './TeamContainer';
import useScrollReveal from '../useScrollReveal'; 

const TeamsSection = () => {
  const [sectionRef, sectionVisible] = useScrollReveal(0.1);
  const [titleRef, titleVisible] = useScrollReveal(0.2);
  
  const [team1Ref, team1Visible] = useScrollReveal(0.15);
  const [team2Ref, team2Visible] = useScrollReveal(0.15);
  const [team3Ref, team3Visible] = useScrollReveal(0.15);
  const [team4Ref, team4Visible] = useScrollReveal(0.15);
  
  const teamRefs = [team1Ref, team2Ref, team3Ref, team4Ref];
  const teamVisibility = [team1Visible, team2Visible, team3Visible, team4Visible];

  const teams = [
    {
      title: 'Member Development',
      leaders: [
        {
          name: 'Bilal',
          image: `${process.env.PUBLIC_URL}/images/Bilal.jpg`,
          specialization: 'Team Leader'
        },
        {
          name: 'Rama',
          image: `${process.env.PUBLIC_URL}/images/Rama.jpg`,
          specialization: 'Team Leader'
        }
      ],
      description: 'The pillar of IEEE responsible for team safety compliance as well as member entry regulation into our family.',
      icon: Users,  
      primaryColor: '#FFFFFF',      
      secondaryColor: '#29ABD8',
      hoverIntensity: 1.2, 
      slideDirection: 'bottom-right'
    },
    {
      title: 'Technical',
      leaders: [
        {
          name: 'Tasneem',
          image: `${process.env.PUBLIC_URL}/images/Tasneem.jpg`,
          specialization: 'Team Leader'
        },
        {
          name: 'Yousef',
          image: `${process.env.PUBLIC_URL}/images/Yousef.jpg`,
          specialization: 'Team Leader'
        }
      ],
      description: 'The mastermind behind all academic activities, like conducting workshops, and IT projects.',
      icon: Code,  
      primaryColor: '#FFFFFF',      
      secondaryColor: '#29ABD8',
      hoverIntensity: 1.2, 
      slideDirection: 'bottom-left'
    },
    {
      title: 'Social Media',
      leaders: [
        {
          name: 'Anas',
          image: `${process.env.PUBLIC_URL}/images/Anas.jpg`,
          specialization: 'Team Leader'
        },
        {
          name: 'Layan',
          image: `${process.env.PUBLIC_URL}/images/Layan.jpg`,
          specialization: 'Team Leader'
        }
      ],
      description: 'Create engaging social media content, like videos, designs, and writing, while promoting IEEE CS workshops/events.',
      icon: Instagram, 
      primaryColor: '#FFFFFF',      
      secondaryColor: '#29ABD8',
      hoverIntensity: 1.2, 
      slideDirection: 'top-left'
    },
    {
      title: 'Events & Public Relations',
      leaders: [
        {
          name: 'Yara',
          image: `${process.env.PUBLIC_URL}/images/Yara.png`,
          specialization: 'Public Relations Team Leader'
        },
        {
          name: 'Omar',
          image: `${process.env.PUBLIC_URL}/images/Omar.jpg`,
          specialization: 'Events Management Team Leader'
        }
      ],
      description: 'Empowering connections, crafting unforgettable experiences, and spreading joy through creativity.',
      icon: Megaphone, 
      primaryColor: '#FFFFFF',      
      secondaryColor: '#29ABD8',
      hoverIntensity: 1.2, 
      slideDirection: 'top-right'
    }
  ];
  
  return (
    <section 
      className={`teams-section ${sectionVisible ? 'revealed' : ''}`} 
      id="our-teams"
      ref={sectionRef}
    >
      <div className="teams-container">
        <h1 
          className={`teams-section-title scroll-reveal zoom-in ${titleVisible ? 'revealed' : ''}`}
          ref={titleRef}
        >
          Our Teams
        </h1>
        
        <div className="teams-grid">
          {teams.map((team, index) => {
            const ref = teamRefs[index];
            const isVisible = teamVisibility[index];
            
            return (
              <div 
                key={index} 
                className={`scroll-reveal delay-${(index + 1) * 100} ${index % 2 === 0 ? 'slide-right' : 'slide-left'} ${isVisible ? 'revealed' : ''}`}
                ref={ref}
              >
                <TeamContainer {...team} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamsSection;