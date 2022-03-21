import joi from "joi";

const flavourSchema = joi.object({
  name: joi.string().min(2).required().trim(),
});

export default flavourSchema;
