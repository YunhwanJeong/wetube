import passport from "passport";
import passportGithub from "passport-github";
import passportFacebook from "passport-facebook";
import User from "./Models/User";
import routes from "./routes";
import {
  githubLoginCallback,
  facebookLoginCallback
} from "./controller/userController";

const GithubStrategy = passportGithub.Strategy;
const FacebookStrategy = passportFacebook.Strategy;

passport.use(User.createStrategy());
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://floating-reaches-06734.herokuapp.com${routes.githubCallback}`
        : `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: `https://floating-reaches-06734.herokuapp.com/${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"]
    },
    facebookLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
