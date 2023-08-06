const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const fileController = require("../controllers/files");
const { authenticate } = require("../middlewares");
const upload = require("../helpers/upload");

router.post("/signup", express.json(), userController.addUser);
router.post("/signin/new_token", express.json(), userController.refreshToken);
router.post("/signin", express.json(), userController.signin);
router.post("/info", authenticate, express.json(), userController.getInfo);
router.post("/logout", authenticate, express.json(), userController.logout);

router.post(
  "/file/upload",
  authenticate,
  upload.single("file"),
  fileController.upload
);

module.exports = router;
