import express from "express";
import {
  subscribeNewsletter,
  unsubscribeNewsletter,
} from "../controllers/newsletterController.js";

const router = express.Router();

// Route to subscribe to the newsletter
router.post("/subscribe", subscribeNewsletter);

// Route to unsubscribe from the newsletter
router.post("/unsubscribe", unsubscribeNewsletter);

export default router;
