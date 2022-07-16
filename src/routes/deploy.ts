
import express from 'express';
import controller from '../controller/deploy';
const router = express.Router();

router.post('/deploy', controller.deploy);

export = router;