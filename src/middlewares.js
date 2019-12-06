import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ID,
  secretAccessKey: process.env.AWS_S3_SECRET,
  region: "ap-northeast-2"
});

const multerUploadVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetube.aiden/video"
  })
});
const multerUploadAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetube.aiden/avatar"
  })
});

export const uploadVideo = multerUploadVideo.single("videoFile");
export const uploadAvatar = multerUploadAvatar.single("avatar");

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
