import {schemaSign, schemaPosts} from './joi.middelware.js'


export  const POST = (req, res, next) => {
  try {
    if(req.url == '/sign' && req.method == "POST"){
      
      let validet = schemaSign.validate(req.body)
      
      if(validet.error) throw new Error(validet.error)
      
      next()
      
    }
    if(req.url == '/posts' && req.method == "POST"){
      let validet = schemaPosts.validate(req.body)
      
      if(validet.error) throw new Error(validet.error)
      
      next()
      
    }


  } catch (error) {
    res.status(400).send({status: error.status, message:error.message})
  }
  
  
}



