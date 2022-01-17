import clientPromise from '../../../../lib/mongodb';

export default async function handler(req, res) {
  const {
    query: { uuid },
    method,
  } = req;

  switch (method) {
    case 'GET':
      return getSchedule(uuid, res);

    case 'PUT':
      return putSchedule(uuid, req.body, res);

    default:
      return res.status(404).json({ 'success': false, 'message': 'Route not found' });
  }
}

async function getSchedule(uuid, res) {
  let dbClientPromise;
  try {
    dbClientPromise = await clientPromise;
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error connecting to database.',
    });
  }
  const db = dbClientPromise.db('airtimewtf');
  const scheduleCollection = db.collection('schedules');
  const schedule = await scheduleCollection.findOne({ _id: uuid });

  if (!schedule) {
    return res.status(404).json({
      success: false,
      message: 'Schedule not found.',
    });
  }

  return res.status(200).json({
    success: true,
    data: { trackedShows: schedule.shows },
  });
}

async function putSchedule(uuid, reqBody, res) {
  let dbClientPromise;
  try {
    dbClientPromise = await clientPromise;
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving data from database.',
    });
  }
  const db = dbClientPromise.db('airtimewtf');
  const scheduleCollection = db.collection('schedules');
  await scheduleCollection.updateOne(
    { _id: uuid },
    { $set: { shows: reqBody } },
    { upsert: true },
  );
  return res.status(200).json({
    success: true,
    data: 'Document updated successfully.',
  });
}
