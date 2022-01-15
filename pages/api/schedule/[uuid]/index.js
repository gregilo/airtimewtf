import clientPromise from '../../../../lib/mongodb';

export default async function handler(req, res) {
  const {
    query: { uuid },
    method,
  } = req;

  switch (method) {
    case 'GET':
      return getSchedule(uuid, res);
  }
}

async function getSchedule(uuid, res) {
  const dbClientPromise = await clientPromise;
  const db = dbClientPromise.db('airtimewtf');
  const scheduleCollection = db.collection('schedules');
  const schedule = await scheduleCollection.findOne({ _id: uuid });

  if (!schedule) {
    return res.status(404).json({
      success: false,
      message: 'Schedule not found.'
    });
  }

  return res.status(200).json({
    success: true,
    data: { trackedShows: schedule.shows }
  });
}


