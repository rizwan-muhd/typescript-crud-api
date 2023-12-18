import express from "express";
import * as astrologerController from "../controllers/AstrologerController";
// import uploadProfilePicture from "../middlewares/multer.js";
// import {userAuthentication} from "../middlewares/authMiddlewares.js";
const router = express.Router();

// router.post('/login',userController.verifyLogin)

router.post("/astrologers/register", astrologerController.register);

router.get("/astrologers", astrologerController.getAstrologers);
router.get("/my-astrologers/:id", astrologerController.getMyAstrologers);

router.patch("/astrologers/:id", astrologerController.updateAstrologer);

router.delete("/astrologers/:id", astrologerController.deleteAstrologer);

export default router;
