import React, { useEffect } from 'react';
import EventsWorkshops from './EventsWorkshops';
import '../ComponentsStyling/AllEvents.css';

const AllEvents = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="all-events-page">
      <div className="page-header">
        <div className="container">
          <p>Explore our complete collection of events, workshops, and activities throughout the years.</p>
        </div>
      </div>
      
      <EventsWorkshops limit={null} showExploreMore={false} />
    </div>
  );
};

export default AllEvents;