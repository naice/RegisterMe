import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import axios from 'axios';

const fsp = fs.promises;

interface ProxyRequest {
    method: string;
    target: string;
    payload?: unknown;
}

// update Register
const proxy = async (req: Request, res: Response, next: NextFunction) => {
    const p = req.body as ProxyRequest;
    
    const result = await axios.request({ method: p.method, url: p.target, data: p.payload });
    
    console.log(typeof result.data);
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(
        result.data
    );
};


export default {  proxy, };