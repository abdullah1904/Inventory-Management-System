import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/constants";
import { db } from "..";


const { HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR, HTTP_OK, HTTP_NOT_FOUND } = HttpStatusCode;

const createUser = (req: Request, res: Response) => {
    if (!req.body?.name || !req.body?.email || !req.body?.contactno) {
        return res.status(HTTP_BAD_REQUEST.code).json({ message: HTTP_BAD_REQUEST.message });
    }
    const sql = 'INSERT INTO user SET ?';
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

const getUsers = (req: Request, res: Response) => {
    const sql = 'SELECT * FROM user';
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

const getUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM user WHERE id = ?';
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

const updateUser = (req:Request, res:Response)=>{
    const id = req.params?.id;
    if (!req.body?.email || !req.body?.contactno) {
        return res.status(HTTP_BAD_REQUEST.code).json({ message: HTTP_BAD_REQUEST.message });
    }
    const sql = `UPDATE user SET email = ?, contactno = ? WHERE id = ${id}`;
    db.query(sql,[ req.body.email, req.body.contactno],(err,data)=>{
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

const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const sql = 'DELETE FROM user WHERE id = ?';
    db.query(sql, id, (err, data) => {
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

export { createUser, getUsers, getUser, deleteUser, updateUser }