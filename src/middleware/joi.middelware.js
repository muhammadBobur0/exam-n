import Joi from "joi";

export const schemaSign = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  
  password: Joi.string().min(3).max(30).required()
})

export const schemaPosts  =  Joi.object({

  dateY : Joi.string().min(4).max(10).required(),
  dateH: Joi.string().min(4).max(10).required(),
  job : Joi.string().required(),
  subcategory: Joi.number().required(),
  type: Joi.string().required(),
  fullname: Joi.string().required(),
  phone: Joi.number().required(),
  description: Joi.string().required(),
  title: Joi.string().min(5).max(100).required(),
  text: Joi.string().min(50).max(1000).required()

})
