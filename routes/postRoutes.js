import express from 'express';
import { check } from 'express-validator';
import { getPosts,createPost,deletePost,updatePost } from '../controllers/postController.js';
import {auth} from '../middleware/authMiddleware.js'
const router = express.Router();


router.post('/', [
    auth, check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty()
], createPost);
// author automatically set from backend as req.user.id

router.get('/', getPosts);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

export default router;
