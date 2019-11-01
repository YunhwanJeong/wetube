import routes from "./routes";
import multer from "multer";

const upload = multer({ dest: 'uploads/videos/' });

export const localsmiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthentication: true,
    id: 1
  }
  next();
}



export const uploadVideo = upload.single("videoFile");