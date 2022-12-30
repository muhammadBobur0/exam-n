import { Router } from 'express';
import { POST } from '../middleware/post.middelware.js';
import UserSign from '../controllers/user.sing.controllers.js';
import { checkToken } from '../utils/tokens.js';
import { adminPadding , usersapply, usersreject} from '../controllers/admin.controller.js';

const admin = Router();

admin.post('/sign', POST, UserSign);

admin.get("/getpending", checkToken, adminPadding)

admin.get("/usersapply/:postId", checkToken, usersapply)

admin.get("/usersreject/:postId", checkToken, usersreject)


export default admin;
