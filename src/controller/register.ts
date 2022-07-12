import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

const fsp = fs.promises;

interface RegisterInput {
    name: string;
    endpoints: Record<string, string>;
    ip?: string;
}

interface RegisterObject {
    name: string;
    created: number;
    updated: number;
    endpoints: Record<string, string>;
    ip: string;
}

const registerFileName = "register.json";
const readRegister = async (): Promise<RegisterObject[]> => {
    if (!fs.existsSync(registerFileName)) {
        return [];
    }
    return JSON.parse(
        (await fsp.readFile(registerFileName)).toString()
    );
}

const writeRegister = async (register: RegisterObject[]): Promise<void> => {
    console.log("writing register", register);
    await fsp.writeFile(registerFileName, JSON.stringify(register));
}

// update Register
const updateRegister = async (req: Request, res: Response, next: NextFunction) => {
    const register = await readRegister();
    const registerInput = req.body as RegisterInput;

    const index = register.findIndex((obj) => obj.name === registerInput.name);
    let registerObject: RegisterObject | undefined = undefined;
    if (index !== -1) {
        registerObject = register[index];
    }

    const now = Date.now();
    if (!registerObject) {
        registerObject = { 
            ...registerInput, 
            ip: registerInput.ip ?? req.ip, 
            updated: now, 
            created: now 
        };
        register.push(registerObject);
    } else {
        register[index] = { 
            ...registerObject, 
            ...registerInput, 
            updated: now 
        };
    }

    await writeRegister(register);
    
    return res.status(200).json({
        error: 0,
    });
};

// get Register
const getRegister = async (req: Request, res: Response, next: NextFunction) => {
    const register = await readRegister();
    console.log("register", register);
    return res.status(200).json({
        register,
    });
};

export default {  updateRegister, getRegister, };