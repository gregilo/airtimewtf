import React from 'react';
import Navbar from '../Navbar/Navbar';
import ScheduleBar from '../ScheduleBar/ScheduleBar';

export default function InteriorLayout(props) {
  return (
      <div className="pb-20">
        <Navbar />
        <div className="container">
          {props.children}
        </div>
        <ScheduleBar trackedShows={props.trackedShows} />
      </div>
    );
}
