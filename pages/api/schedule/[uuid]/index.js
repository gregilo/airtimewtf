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

function getSchedule(uuid, res) {

}


