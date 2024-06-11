import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/constants";
import { db } from "..";

const { HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR, HTTP_OK, HTTP_NOT_FOUND } = HttpStatusCode;

const createCategory = (req: Request, res: Response) => {
    if (!req.body?.name) {
        return res.status(HTTP_BAD_REQUEST.code).json({ message: HTTP_BAD_REQUEST.message });
    }
    const sql = 'INSERT INTO category SET ?';
    db.query(sql, req.body, (err) => {
        if (err) {
            return res.status(HTTP_INTERNAL_SERVER_ERROR.code).json({
                message: "Something went wrong, " + err.sqlMessage,
            });
        }
        return res.status(HTTP_OK.code).json({
            message: HTTP_OK.message,
        });
    });
}

const getCategories = (req:Request, res: Response)=>{
    const sql = 'SELECT * FROM category WHERE status = 1';
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

const getCategory = (req:Request, res:Response)=>{
    const { id } = req.params;
    const sql = 'SELECT * FROM category WHERE id = ? AND status = 1';
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

const updateCategory = (req:Request, res:Response)=>{
    const id = req.params?.id;
    if (!req.body?.name) {
        return res.status(HTTP_BAD_REQUEST.code).json({ message: HTTP_BAD_REQUEST.message });
    }
    const sql = `UPDATE category SET name = ? WHERE id = ${id} AND status = 1`;
    db.query(sql,req.body.name,(err,data)=>{
        if (err) {
            console.log(err);
            return res.status(HTTP_INTERNAL_SERVER_ERROR.code).json({
                message: "Something went wrong",
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

const disableCategory = (req: Request, res: Response) => {
    const { id } = req.params;
    const sql = 'UPDATE category SET status = 0 WHERE id = ? AND status = 1';
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.status(HTTP_INTERNAL_SERVER_ERROR.code).json({
                message: "Something went wrong",
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

const enableCategory = (req: Request, res: Response) => {
    const { id } = req.params;
    const sql = 'UPDATE category SET status = 1 WHERE id = ? AND status = 0';
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.status(HTTP_INTERNAL_SERVER_ERROR.code).json({
                message: "Something went wrong",
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

export {createCategory, getCategories, getCategory, disableCategory, updateCategory, enableCategory};