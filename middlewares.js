import multer from "multer";
import routes from "./routes";

const multerUploadVideo = multer({ dest: "uploads/videos/" });
const multerUploadAvatar = multer({ dest: "uploads/avatars" });

export const localsmiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedInUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerUploadVideo.single("videoFile");
export const uploadAvatar = multerUploadAvatar.single("avatar");
