import joi from 'joi';

const clientSchema = joi.object({
  name: joi.string().required().trim(),
  address: joi.string().required().trim(),
  phone: joi.string().min(10).max(11).required().trim()
});

export default clientSchema;