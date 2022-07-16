import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import axios, { AxiosError, AxiosResponse } from 'axios';
import fileUpload from 'express-fileupload';
import * as child from 'child_process';
import * as util from 'util';
import * as os from 'os';

// check the available memory
const userHomeDir = os.homedir();
const fsp = fs.promises;
const exec = util.promisify(child.exec);

// update Register
const deploy = async (req: Request, res: Response, next: NextFunction) => {
    const projectName = req.header("JM-PROJECT-NAME");
    if (!projectName ) {
        return res.status(400).send('JM-PROJECT-NAME header missing.');
    }
    const projectPath = userHomeDir + "/deployed/"+projectName;
    let keys: string[];
    if (!req.files || (keys = Object.keys(req.files)).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const reqFile = req.files[keys[0]] as fileUpload.UploadedFile;
    const filePath = reqFile.tempFilePath;
    
    if (fs.existsSync(projectPath)) {
        console.log(`project existing, cleanup. ${projectPath}`);
        await fsp.rm(projectPath, { recursive: true, force: true });
    }
    await fsp.mkdir(projectPath, { recursive: true });

    try {
        const tarCommand = "tar -zxf " + filePath + " -C " + projectPath;
        console.log(tarCommand);
        await exec(tarCommand);
    } catch (error: any) {
        console.log("tar exitcode " + error.code);
        return res.status(500).send(error.stderr);
    }
        
    return res.status(200).send();
};


export default {  deploy, };