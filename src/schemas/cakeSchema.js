import joi from "joi";

const cakeSchema = joi.object({
  name: joi.string().min(2).trim().required(),
  price: joi.number().min(1).required(),
  description: joi.string().allow(""),
  image: joi.string().trim().required().uri(),
  flavourId: joi.number(),
});

export default cakeSchema;
