import React from 'react';
import ScheduleBar from '../ScheduleBar/ScheduleBar';

export default function HomeLayout(props) {
  return (
    <React.Fragment>
      {props.children}
      <ScheduleBar trackedShows={props.trackedShows} />
    </React.Fragment>
  );
}
