import React from 'react';
import Navbar from '../Navbar/Navbar';
import ScheduleBar from '../ScheduleBar/ScheduleBar';

export default function InteriorLayout(props) {
  return (
      <div className="pb-28">
        <Navbar />
        <div className="container">
          {props.children}
        </div>
        {props.hideScheduleBar ? '' : <ScheduleBar trackedShows={props.trackedShows} />}
      </div>
    );
}
