
import express from 'express';
import controller from '../controller/register';
const router = express.Router();

router.get('/register', controller.getRegister);
router.post('/register', controller.updateRegister);

export = router;