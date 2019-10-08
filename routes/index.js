const router = require("express").Router();
const validator = require("../utils/validator");

const db = require("../config/conn");

const authSchema = require("../schemas/auth");
const adminSchema = require("../schemas/admin");
const playSchema = require("../schemas/play");

const auth = require("./auth");
const admin = require("./admin");
const play = require("./play");
const frontend = require("./frontend");

const redirectIfLoggedIn = async (req, res, next) => {
  if (req.isAuthenticated()) {
    let err, result2;
    [err, result2] = await to(
      db.query(`SELECT score FROM users WHERE id=?`, [req.user.id])
    );
    sendUser = req.user;
    sendUser.score = result2[0]["score"];

    return res.sendSuccess(null, sendUser);
  }
  return next();
};

const authenticate = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  else return res.sendError(null, "Login First!");
};

const access = level => (req, res, next) => {
  if (req.user && req.user.access >= level) return next();
  return res.sendError(null, "Unauthorized access");
};

//Authentication routes
router.post(
  "/auth/register",
  redirectIfLoggedIn,
  validator(authSchema.register),
  auth.register
);
router.post(
  "/auth/login",
  redirectIfLoggedIn,
  validator(authSchema.login),
  auth.login
);
router.get("/auth/logout", authenticate, auth.logout);
router.post(
  "/auth/forgotpassword",
  redirectIfLoggedIn,
  validator(authSchema.forgot),
  auth.forgotpassword
);
router.post("/auth/resetpassword", redirectIfLoggedIn, auth.resetpassword);

router.get("/home", redirectIfLoggedIn, frontend.index);

//admin routes
router.post(
  "/admin/addquestion",
  authenticate,
  access(20),
  validator(adminSchema.question),
  admin.addQuestion
);
router.post(
  "/admin/addhint",
  authenticate,
  access(20),
  validator(adminSchema.hint),
  admin.addHint
);

//gameplay
router.post(
  "/play/submit",
  authenticate,
  validator(playSchema.answer),
  play.submit
);
router.get("/play/rank", authenticate, play.rank);
router.get("/play/colors", authenticate, play.colors);
router.get("/play/:id", authenticate, play.showQuestion);

module.exports = router;
