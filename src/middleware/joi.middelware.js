import Joi from "joi";

export const schemaSign = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  
  password: Joi.string().min(3).max(30).required()
})

export const schemaPosts  =  Joi.object({
  subcategory_id: Joi.number().required(),
  title: Joi.string().min(5).max(100).required(),
  body: Joi.string().min(50).max(1000).required(),
  dataH: Joi.string().min(4).max(10).required(),
  dateY: Joi.string().min(4).max(10).required(),
  avatar: Joi.string().pattern(new RegExp(/\.(gif|jpe?g|png|webp)$/i))
})
