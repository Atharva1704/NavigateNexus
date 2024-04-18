import express from "express";
import { getOne, logTravel } from "../controllers/travelDetail.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

router.get("/", verifyToken, getOne);



export default router;