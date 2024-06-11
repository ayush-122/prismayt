import {Router} from 'express';

import {createComment,updateComment,deleteComment,fetchComments,showComment } from '../Controller/CommentController.js';

const router =Router();

router.post("/" ,createComment);
router.put("/:id",updateComment);
router.get("/" ,fetchComments);
router.get("/:id",showComment);
router.delete("/:id",deleteComment);
export default router;