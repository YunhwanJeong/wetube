import routes from "./routes";

export const localsmiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthentication: true,
    id: 1
  }
  next();
}
