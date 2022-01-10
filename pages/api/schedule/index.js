import { v4 as uuidv4 } from 'uuid';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (!req.body || !Array.isArray(req.body) || !req.body.length) {
    return res.status(400).json({ message: 'Invalid request body. Please provide an array of show IDs.' });
  }
  for (const showId of req.body) {
    if (!Number.isInteger(showId)) {
      return res.status(400).json({ message: 'Invalid show ID provided.' });
    }
  }

  const dbClientPromise = await clientPromise;
  const db = dbClientPromise.db('airtimewtf');
  const scheduleCollection = db.collection('schedules');

  const uuid = uuidv4();
  scheduleCollection.insertOne({
    _id: uuid,
    shows: req.body,
  });
  return res.status(200).json({ scheduleUrl: `http://localhost:3000/api/schedule/${uuid}` });
}