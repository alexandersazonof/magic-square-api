import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { getUserByAddress } from './graphql/graph-service';

dotenv.config();

const app = express();
const port = +(process.env.PORT  || 3000);

app.get('/api/verify', async(req: Request, res: Response) => {
  const address = req.query.address;
  const startTimestamp = req.query.timestamp;

  if (!address || typeof address !== 'string') {
    return res.status(400).json({
      code: 400,
      message: "Invalid address parameter",
      data: {
        result: false
      }
    });
  }

  if (!startTimestamp) {
    return res.status(400).json({
      code: 400,
      message: "Invalid timestamp parameter",
      data: {
        result: false
      }
    });
  }

  const users = await getUserByAddress(address.toLowerCase());

  if (users.length === 0) {
    return res.status(200).json({
      code: 404,
      message: "User not found",
      data: {
        result: false
      }
    });
  }

  const user = users[0];
  if (user.heroes.length === 0) {
    return res.status(200).json({
      code: 404,
      message: "Hero not found",
      data: {
        result: false
      }
    });
  }
  const hero = user.heroes[0];
  if (hero.timestamp < startTimestamp) {
    return res.status(400).json({
      code: 400,
      message: "First hero timestamp is less than start timestamp",
      data: {
        result: false
      }
    });
  }
  if (hero.stats.level < 2) {
    return res.status(400).json({
      code: 400,
      message: "Hero level is less than 2",
      data: {
        result: false
      }
    });
  }
  return res.status(200).json({
    code: 200,
    message: "OK",
    data: {
      result: true
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});