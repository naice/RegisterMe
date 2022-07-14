
import express from 'express';
import controller from '../controller/proxy';
const router = express.Router();

router.post('/proxy', controller.proxy);

export = router;