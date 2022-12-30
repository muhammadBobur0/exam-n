import { Router } from 'express';
import { POST } from '../middleware/post.middelware.js';
import { checkToken } from '../utils/tokens.js';
import { adminPadding , usersapply, UserSign, usersreject} from '../controllers/admin.controller.js';

const admin = Router();

admin.post('/sign', POST, UserSign);

admin.get("/getpending", checkToken, adminPadding)

admin.get("/usersapply/:postId", checkToken, usersapply)

admin.get("/usersreject/:postId", checkToken, usersreject)


export default admin;
