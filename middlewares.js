import routes from "./routes";
import multer from "multer";

export const localsmiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthentication: true,
    id: 1
  }
  next();
}

const upload = multer({ dest: 'videos/'});

export const uploadVideo = upload.single("videofile");