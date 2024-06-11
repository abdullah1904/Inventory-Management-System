import { Request, Response } from "express"
import { HttpStatusCode } from "../utils/constants";
import { db } from "..";


const { HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR, HTTP_OK, HTTP_NOT_FOUND } = HttpStatusCode;

const createOrder = (req: Request, res: Response) => {
    const { productId, userId } = req.body;
    if (!productId || !userId) {
        return res.status(HTTP_BAD_REQUEST.code).json({ message: HTTP_BAD_REQUEST.message });
    }
    const checkExistenceAndInsertOrderSql = `
        INSERT INTO orders (productId, userId)
        SELECT ?, ?
        FROM product p, user u
        WHERE p.id = ? AND u.id = ?`;
    db.query(checkExistenceAndInsertOrderSql, [productId, userId, productId, userId], (err, result) => {
        if (err) {
            return res.status(HTTP_INTERNAL_SERVER_ERROR.code).json({
                message: "Something went wrong, " + err.sqlMessage,
            });
        }
        if (result.affectedRows === 0) {
            return res.status(HTTP_BAD_REQUEST.code).json({
                message: "Product or user does not exist",
            });
        }
        return res.status(HTTP_OK.code).json({
            message: HTTP_OK.message,
        });
    });
}

const getOrders = (req:Request, res:Response)=>{
    const sql = `
        SELECT 
            o.id AS orderId, 
            p.name AS productName, 
            p.price AS productPrice, 
            u.name AS userName, 
            u.email AS userEmail, 
            o.orderedAt
        FROM 
            orders o
        JOIN 
            product p ON o.productId = p.id
        JOIN 
            user u ON o.userId = u.id`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(HTTP_INTERNAL_SERVER_ERROR.code).json({
                message: "Something went wrong, " + err.sqlMessage,
            });
        }
        return res.status(HTTP_OK.code).json({
            message: HTTP_OK.message,
            data: results
        });
    });
}

const getOrder = (req:Request, res:Response)=>{
    const {id} = req.params;
    const sql = `
        SELECT 
            o.id AS orderId, 
            p.name AS productName, 
            p.price AS productPrice, 
            u.name AS userName, 
            u.email AS userEmail, 
            o.orderedAt
        FROM 
            orders o
        JOIN 
            product p ON o.productId = p.id
        JOIN 
            user u ON o.userId = u.id
        WHERE o.id = ${id}`;
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(HTTP_INTERNAL_SERVER_ERROR.code).json({
                message: "Something went wrong",
            });
        }
        if (!!data[0]) {
            return res.status(HTTP_OK.code).json({
                message: HTTP_OK.message,
                data: data[0]
            });
        }
        else {
            return res.status(HTTP_NOT_FOUND.code).json({
                message: HTTP_NOT_FOUND.message,
            });
        }
    });
}

export { createOrder,getOrders,getOrder};