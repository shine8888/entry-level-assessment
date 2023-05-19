import express from 'express';
import * as controller from '../controller';
import { validate } from 'express-validation';
import { getSessionRequestValidate } from '../validations/sessionRequest';

const router = express.Router();

router
  .route('/sessions')
  .get(validate(getSessionRequestValidate), controller.getSessionData);

export default router;
