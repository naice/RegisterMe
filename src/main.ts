/** source/server.ts */
import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import registerRoutes from './routes/register';
import proxyRoutes from './routes/proxy';
import deployRoutes from './routes/deploy';
import cors from 'cors';
import fileUpload from 'express-fileupload';

const router: Express = express();

/** Logging */
router.use(morgan('dev'));
router.use(fileUpload({ useTempFiles: true }));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

//router.use(cors);

/** RULES OF OUR API */
router.use((req, res, next) => {

    // set the CORS policy
    const origin = req.header("origin");
    if (origin) {
        console.log("REQUEST ORIGIN: " + origin);
        res.header('Access-Control-Allow-Origin', origin);
    } else {
        console.log("NO ORIGIN: ");
        res.header('Access-Control-Allow-Origin', '*');
    }
    
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/', registerRoutes);
router.use('/', proxyRoutes);
router.use('/', deployRoutes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 4711;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));