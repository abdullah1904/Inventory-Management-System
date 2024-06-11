import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/constants";
import { db } from "..";

const { HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR, HTTP_OK, HTTP_NOT_FOUND } = HttpStatusCode;


const createProduct = (req: Request, res: Response) => {
    const { name, price, categoryId, quantity } = req.body;
    if (!name || !price || !categoryId || !quantity) {
        return res.status(HTTP_BAD_REQUEST.code).json({ message: HTTP_BAD_REQUEST.message });
    }
    const checkCategorySql = 'SELECT id FROM category WHERE id = ? AND status = 1';
    db.query(checkCategorySql, [categoryId], (err, results) => {
        if (err) {
            return res.status(HTTP_INTERNAL_SERVER_ERROR.code).json({
                message: "Something went wrong, " + err.sqlMessage,
            });
        }
        if (results.length === 0) {
            return res.status(HTTP_BAD_REQUEST.code).json({
                message: "Category Id does not exist",
            });
        }
        const insertProductSql = 'INSERT INTO product SET ?';
        db.query(insertProductSql, req.body, (err) => {
            if (err) {
                return res.status(HTTP_INTERNAL_SERVER_ERROR.code).json({
                    message: "Something went wrong, " + err.sqlMessage,
                });
            }
            return res.status(HTTP_OK.code).json({
                message: HTTP_OK.message,
            });
        });
    });
}

const getProducts = (req:Request, res:Response)=>{
    const sql = 'SELECT P.id, P.name, P.price FROM product P JOIN category C ON P.categoryId = C.id WHERE C.status = 1 ORDER BY P.id';
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(HTTP_INTERNAL_SERVER_ERROR.code).json({
                message: "Something went wrong",
            });
        }
        return res.status(HTTP_OK.code).json({
            message: HTTP_OK.message,
            data
        });
    });
}

const getProduct = (req: Request, res: Response) => {
    const { id } = req.params;
    const sql = 'SELECT P.id, P.name, P.price FROM product P JOIN category C ON P.categoryId = C.id WHERE C.status = 1 AND P.id = ?';
    db.query(sql, id, (err, data) => {
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
    })
}

const deleteProduct = (req:Request, res:Response)=>{
    const { id } = req.params;
    const sql = "DELETE product FROM product JOIN category ON product.categoryId = category.id WHERE category.status = 1 AND product.id = ?";
    db.query(sql, [id],(err, data) => {
        if (err) {
            return res.status(HTTP_INTERNAL_SERVER_ERROR.code).json({
                message: "Something went wrong, " + err.sqlMessage,
            });
        }
        if (data.affectedRows) {
            return res.status(HTTP_OK.code).json({
                message: HTTP_OK.message,
            });
        }
        else {
            return res.status(HTTP_NOT_FOUND.code).json({
                message: HTTP_NOT_FOUND.message,
            });
        }
    })
}

const updateProduct = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, categoryId, quantity } = req.body;
    if (!name || !price || !categoryId || !quantity) {
        return res.status(HTTP_BAD_REQUEST.code).json({ message: HTTP_BAD_REQUEST.message });
    }
    const updateProductSql = `UPDATE product JOIN category ON product.categoryId = category.id SET product.name = ?, product.price = ?, product.categoryId = ?, product.quantity = ? WHERE product.id = ${id} AND category.status = 1`;
    db.query(updateProductSql, [name, price, categoryId, quantity], (err, result) => {
        if (err) {
            return res.status(HTTP_INTERNAL_SERVER_ERROR.code).json({
                message: "Something went wrong, " + err.sqlMessage,
            });
        }
        if (result.affectedRows) {
            return res.status(HTTP_OK.code).json({
                message: HTTP_OK.message,
            });
        } else {
            return res.status(HTTP_NOT_FOUND.code).json({
                message: "Product not found or category is not active",
            });
        }
    });
};

export {createProduct, getProducts, getProduct, deleteProduct, updateProduct};