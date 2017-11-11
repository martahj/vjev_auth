// @flow
import Express from 'express';
import selectn from 'selectn';
import sendResponse from '../helpers/responses';
import { account, token, DUPLICATE_EMAIL_ERROR } from '../models';

const route = Express.Router();

route.post('/signup', async (req, res) => {
  try {
    const email = selectn('email', req.body);
    const password = selectn('password', req.body);
    if (!email) return sendResponse(res, 400, 'Email required for signup');
    if (!password) return sendResponse(res, 400, 'Password required for signup');
    try {
      const user = await account.createAccount(email, password);
      const createdToken = await token.createToken(email);
      await token.addToken(createdToken);
      return sendResponse(res, 201, {
        token: createdToken,
        user: {
          admin: user.admin,
          email: user.email,
        },
      });
    } catch (err) {
      if (err.message === DUPLICATE_EMAIL_ERROR) {
        return sendResponse(res, 400, 'An account is already associated with this email');
      }
      throw err;
    }
  } catch (err) {
    sendResponse(res, 500);
  }
});

/*
 * Authenticate user by email and password
 * Input: email, password
 * Output: token
 */
route.post('/login', async (req, res) => {
  try {
    const email = selectn('email', req.body);
    const password = selectn('password', req.body);
    if (!email) sendResponse(res, 400, 'Email required for login');
    if (!password) sendResponse(res, 400, 'Password required for login');
    const loginValid = await account.checkValidLogin(email, password);
    if (!loginValid) {
      return sendResponse(res, 400, 'Incorrect email or password');
    }
    const user = await account.findByEmail(email);
    const createdToken = await token.createToken(email);
    await token.addToken(createdToken);
    sendResponse(res, 201, {
      token: createdToken,
      user: {
        admin: user.admin,
        email: user.email,
      },
    });
  } catch (err) {
    sendResponse(res, 500);
  }
});

route.post('/logout', async (req, res) => {
  try {
    // TODO delete token
    // const { token } = req;
    // const tokenDeleted = await models.token.deleteToken(token);
    // if (!tokenDeleted) sendResponse(res, 500);
    // sendResponse(res, 201);
  } catch (err) {
    sendResponse(res, 500);
  }
});

export default route;
