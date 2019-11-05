import express from "express";
import routes from "../routes";
import { videoDetail, getEditVideo, postEditVideo, deleteVideo, getUpload, postUpload } from "../controller/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

//upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

//Detail
videoRouter.get(routes.videoDetail(), videoDetail);

//Edit
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

//Delete
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;