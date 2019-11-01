import express from "express";
import routes from "../routes";
import { videoDetail, editVideo, deleteVideo, getUpload, postUpload } from "../controller/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo(), editVideo);
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;