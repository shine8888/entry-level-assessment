import Joi from 'joi';

export const getSessionRequestValidate = {
  params: Joi.object({
    status: Joi.string().optional(),
    short_title: Joi.string().optional(),
  }),
};
