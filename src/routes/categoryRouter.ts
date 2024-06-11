import { Router } from "express";
import { createCategory, disableCategory, enableCategory, getCategories, getCategory, updateCategory } from "../controllers/categoryControllers";

const categoryRouter = Router();

categoryRouter.get('/getCategories',getCategories);
categoryRouter.get('/getCategory/:id',getCategory);
categoryRouter.post('/createCategory',createCategory);
categoryRouter.put('/updateCategory/:id',updateCategory);
categoryRouter.put('/disableCategory/:id',disableCategory);
categoryRouter.put('/enableCategory/:id',enableCategory);

export { categoryRouter };