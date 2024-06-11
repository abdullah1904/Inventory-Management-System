import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/productControllers";

const productRouter = Router();

productRouter.get('/getProducts',getProducts);
productRouter.get('/getProduct/:id',getProduct);
productRouter.delete('/deleteProduct/:id',deleteProduct);
productRouter.put('/updateProduct/:id',updateProduct);
productRouter.post('/createProduct',createProduct);


export {productRouter};