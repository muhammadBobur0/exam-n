import { Router } from 'express';
import UserSign from '../controllers/user.sing.controllers.js';
import { POST } from '../middleware/post.middelware.js';

const Sigin = Router();

Sigin.post('/sign', POST, UserSign);
export default Sigin;
