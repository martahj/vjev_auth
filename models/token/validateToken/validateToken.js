// @flow
import jwt from 'jsonwebtoken';
import { secret } from '../../../config/jwt';

const validateToken = (token: string) => jwt.verify(token, secret);
