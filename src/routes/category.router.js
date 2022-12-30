import { Router } from 'express';
import  {categoryController, subcategoryController} from '../controllers/category.controller.js'


const category = Router();
category.get('/category', categoryController )
category.get('/subcategory', subcategoryController)
export default category;
