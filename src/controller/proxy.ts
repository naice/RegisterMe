import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import axios, { AxiosError, AxiosResponse } from 'axios';

const fsp = fs.promises;

interface ProxyRequest {
    method: string;
    target: string;
    payload?: unknown;
}

// update Register
const proxy = async (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-requested-with, content-type");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Max-Age", "1000000000");
    if ('OPTIONS' == req.method) { res.send(200); }
    const p = req.body as ProxyRequest;

    let response: AxiosResponse<any, any> | undefined;

    try {
        console.log("1");
        response = await axios.request({ method: p.method, url: p.target, data: p.payload, timeout: 2000 });         
        console.log("2");
    } catch (err: unknown | AxiosError) {
        if (axios.isAxiosError(err) && err.response)
        {
            response = err.response;
        }
    }
    
    if (!response) {
        return res.status(500);
    }

    return res.status(response.status).json(
        response.data
    );
};


export default {  proxy, };