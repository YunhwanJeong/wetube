import express from "express";
import routes from "../routes";
import { home, search } from "../controller/videoController";
import {
  getJoin,
  postJoin,
  logout,
  getLogin,
  postLogin,
  githubLoginAskOwner,
  githubLoginSuccess,
  githubLoginFindOrCreate,
  getMe,
  facebookLoginAskOwner,
  facebookLoginFindOrCreate,
  facebookLoginSuccess
} from "../controller/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.me, onlyPrivate, getMe);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLoginAskOwner);
globalRouter.get(
  routes.githubCallback,
  githubLoginFindOrCreate,
  githubLoginSuccess
);

globalRouter.get(routes.facebook, facebookLoginAskOwner);
globalRouter.get(
  routes.facebookCallback,
  facebookLoginFindOrCreate,
  facebookLoginSuccess
);

export default globalRouter;
