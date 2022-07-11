import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import * as fs from 'fs';

interface RegisterInput {
    name: string,
}

interface RegisterObject {
    name: string,
    lastSeen: number,
}

const registerFileName = "register.json";
const readRegister = (): RegisterObject[] => {
    if (!fs.existsSync(registerFileName)) {
        return [];
    }
    return JSON.parse(
        fs.readFileSync(registerFileName).toString()
    );
}

// updating a post
const updateRegister = async (req: Request, res: Response, next: NextFunction) => {
    const register = readRegister();
    const registerInput = req.body as RegisterInput;
    
    return res.status(200).json({
        message: response.data
    });
};

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from req.params
    let id: string = req.params.id;
    // delete the post
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // return response
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

// adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let title: string = req.body.title;
    let body: string = req.body.body;
    // add the post
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};

export default {  updateRegister, deletePost, };