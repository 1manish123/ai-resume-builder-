import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { enhanceJobDescription, enhanceProfessionalSummary, enhanceText, uploadResume, analyzeResume} from "../controllers/aiController.js";



const aiRouter = express.Router();


aiRouter.post('/enhance-pro-sum', protect, enhanceProfessionalSummary)
aiRouter.post('/enhance-job-desc', protect, enhanceJobDescription)
aiRouter.post('/enhance-text', protect, enhanceText)
aiRouter.post('/analyze-resume', protect, analyzeResume)
aiRouter.post('/upload-resume', protect, uploadResume)

export default aiRouter