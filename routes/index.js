import { Router } from "express";

import UserRoutes from "./userRoutes.js";
import PostRoutes from "./postRoutes.js";
import commentRoutes from "./commentRoutes.js";

const router =Router();

router.use("/api/user",UserRoutes);

//* for post routes

router.use("/api/post",PostRoutes);

//* for comment routes

router.use("/api/comment",commentRoutes);
export default router;