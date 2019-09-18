import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // transform sync to async on jwt.verify

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization; // take the token

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // take off space and take just the token of array (desestruturação)
  const [, token] = authHeader.split(' ');

  try {
    // take all come from token
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // put the userId on request, so all routes come after can take id by request
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
