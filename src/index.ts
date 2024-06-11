import express, { Request, Response } from "express"
import mysql from "mysql";
import { productRouter, categoryRouter, userRouter, orderRouter } from "./routes";

const app = express();
app.use(express.json());

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database', err.message);
        return;
    }
    console.log('Connected to the database');
    app.listen(8080, () => {
        console.log('App is running on port 8080');
    })
});

app.use('/user',userRouter);
app.use('/category',categoryRouter);
app.use('/product',productRouter);
app.use('/order',orderRouter);

app.get('/',(req:Request, res: Response)=>{
    
})
