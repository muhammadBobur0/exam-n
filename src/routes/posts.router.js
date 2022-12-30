import { Router } from 'express';
import { POST } from '../middleware/post.middelware.js';
import { GET,  NEWPOST, GetParams, getImage} from '../controllers/posts.controller.js';

const Posts = Router();

Posts.get( '/posts', GET)
Posts.post('/posts', POST, NEWPOST)
Posts.get('/post/:id', GetParams)
Posts.get('/view/:imgName', getImage)


export default Posts;