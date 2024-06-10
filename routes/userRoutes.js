import {Router} from 'express';

import { createUser,updateuser,fetchUsers } from '../Controller/UserController.js';

const router =Router();

router.post("/" ,createUser);
router.put("/:id",updateuser);
router.get("/" ,fetchUsers);

export default router;