import { Router } from 'express';
import { POST } from '../middleware/post.middelware.js';
import { GET,  NEWPOST} from '../controllers/posts.controller.js';

const Posts = Router();

Posts.get( '/posts', GET)
Posts.post('/posts', POST, NEWPOST)


export default Posts;