import { Router} from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/userControllers";

const userRouter = Router();

userRouter.get('/getUsers',getUsers);
userRouter.get('/getUser/:id',getUser);
userRouter.post('/createUser',createUser);
userRouter.put('/updateUser/:id',updateUser);
userRouter.delete('/deleteUser/:id',deleteUser);


export {userRouter}