import React, { useEffect, useRef, createRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { eventsData } from '../EventsData';
import '../ComponentsStyling/EventsWorkshops.css'; 

const EventsWorkshops = ({ limit = 6, showExploreMore = true }) => {
  const eventRefs = useRef([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  
  // Only display the limited number of events on the homepage
  const displayedEvents = limit ? eventsData.slice(0, limit) : eventsData;

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    eventRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      eventRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const openEventDetails = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto'; 
  };

  const handleExploreMoreClick = (e) => {
    e.preventDefault();
    navigate('/all-events');
    // Ensure the page scrolls to the top when navigating
    window.scrollTo(0, 0);
  };

  eventRefs.current = displayedEvents.map((_, i) => eventRefs.current[i] ?? createRef());

  return (
    <section className="events-workshops" id="events-workshops">
      <div className="container">
        <h2 className="section-title">Events & Workshops</h2>
        <p className="section-description">
          Explore our journey through various technical events and knowledge-sharing workshops.
        </p>
        
        <div className="timeline">
          {displayedEvents.map((event, index) => (
            <div 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              key={event.id}
              ref={el => eventRefs.current[index] = el}
            >
              <div className="timeline-content">
                <div className="event-image">
                  <img src={event.image} alt={event.title} onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `${process.env.PUBLIC_URL}/images/placeholder.jpg`; 
                  }} />
                </div>
                <div className="event-date">{event.date}</div>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <button 
                  className="learn-more-btn"
                  onClick={() => openEventDetails(event)}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {showExploreMore && displayedEvents.length < eventsData.length && (
          <div className="explore-more-container">
            <button onClick={handleExploreMoreClick} className="explore-more-btn">
              Explore More Events
            </button>
          </div>
        )}
      </div>

      {showModal && selectedEvent && (
        <div className="event-modal-overlay" onClick={closeModal}>
          <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedEvent.title}</h2>
              <button className="close-modal-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-image">
              <img src={selectedEvent.image} alt={selectedEvent.title} onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${process.env.PUBLIC_URL}/images/placeholder.jpg`; 
              }} />
            </div>
            <div className="modal-date">{selectedEvent.date}</div>
            <div className="modal-description">
              <p>{selectedEvent.fullDescription}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsWorkshops;