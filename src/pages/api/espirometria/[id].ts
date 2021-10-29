import fs from 'fs';
import path from 'path';
import { BASE_URL } from '@config';

export default async (req, res) => {
  const { id } = req.query;

  // const dir = path.resolve('./public', 'static', 'espirometria', `${id}.txt`);

  const response = await fetch(`${BASE_URL}/static/espirometria/${id}.txt`);
  const file = await response.text();

  // const file = fs.readFileSync(dir, 'utf8');

  const values = file
    .split('\n')
    .map((line) => parseFloat(line))
    .slice(0, -1);

  const data = values.map((value, index) => ({
    value,
    index: index * 0.002,
  }));

  return res.status(200).json(data);
};
