import joi from "joi";

const orderSchema = joi.object({
  clientId: joi.number(),
  cakeId: joi.number(),
  quantity: joi.number().min(1).max(5).required(),
  totalPrice: joi.number(),
});

export default orderSchema;
