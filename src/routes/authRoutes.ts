import { Router } from "express";
import {
  initiateRegistration,
  completeRegistration,
  initiateLogin,
  completeLogin,
  resendOtpEndpoint,
} from "../controllers/authController";

const router = Router();

router.post("/initiate-register", initiateRegistration);
router.post("/complete-register", completeRegistration);
router.post("/initiate-login", initiateLogin);
router.post("/complete-login", completeLogin);
router.post("/resend-otp", resendOtpEndpoint);

export default router;
