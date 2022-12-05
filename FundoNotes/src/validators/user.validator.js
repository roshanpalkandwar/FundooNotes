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

export const newNotesValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(4).required(),
    description: Joi.string().min(4).required(),
    color: Joi.string().optional(),
    
    
    
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    
    next();
  }
};


export const CollaboratorValidator = (req, res, next) => {
  const schema = Joi.object({
    Collaborators: Joi.string().email()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validateBody=value
    next();
  }
};


