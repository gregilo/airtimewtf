import striptags from 'striptags';
import moment from 'moment';
import clientPromise from '../../../../lib/mongodb';

const ics = require('ics');
const tvMazeBaseUrl = 'https://api.tvmaze.com';

export default async function handler(req, res) {
  const {
    query: { uuid },
    method,
  } = req;

  switch (method) {
    default:
      return getSchedule(uuid, res);
  }
}

async function getSchedule(uuid, res) {
  const dbClientPromise = await clientPromise;
  const db = dbClientPromise.db('airtimewtf');
  const scheduleCollection = db.collection('schedules');
  const schedule = await scheduleCollection.findOne({ _id: uuid });

  if (!schedule) {
    return res.status(404).json({ message: 'Schedule not found.' });
  }

  const showIds = schedule.shows;
  const episodes = [];

  for (const showId of showIds) {
    // Get show w/ seasons embedded
    const showInfoReq = await fetch(`${tvMazeBaseUrl}/shows/${showId}?embed=seasons`);
    if (!showInfoReq.ok) {
      console.error(`Error fetching show with ID: ${showId}`);
      continue;
    }
    const showInfoRes = await showInfoReq.json();

    const showName = showInfoRes.name;

    const descendingSeasons = showInfoRes._embedded?.seasons?.reverse();
    for (const season of descendingSeasons) {
      // skip if premiere date isn't set
      if (!season.premiereDate) {
        continue;
      }

      const episodeReq = await fetch (`${tvMazeBaseUrl}/seasons/${season.id}/episodes`);
      if (!episodeReq.ok) {
        console.error(`Error retrieve season with ID: ${season.id} for show with ID: ${showId}`);
        break;
      }
      const episodeRes = await episodeReq.json();

      for (const episode of episodeRes) {
        episodes.push({
          title: `${showName} S${episode.season}E${episode.number}`,
          start: moment(episode.airstamp).format('YYYY-M-D-H-m').split("-").map(timeValue => Number(timeValue)),
          duration: { minutes: episode.runtime ?? 30 },
          description: striptags(episode.description),
        });
      }
      break;
    }
  }

  const calendarEvents = ics.createEvents(episodes);
  if (calendarEvents.error) {
    console.error(calendarEvents.error);
    return res.status(500).json({ message: 'There was an error generating a calendar' });
  }

  // return calendar
  res.status(200).setHeader('Content-Type', 'text/calendar').write(calendarEvents.value);
  return res.end();
}
