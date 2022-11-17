import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    Firstname: Joi.string().min(4).required(),
    Lastname: Joi.string().min(4).required(),
    Username: Joi.string().email().required(),
    Passaword: Joi.string().min(4).required(),
    
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    
    next();
  }
};


