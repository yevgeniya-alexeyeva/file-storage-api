const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const fileController = require("../controllers/files");
const { authenticate } = require("../middlewares");
const upload = require("../helpers/upload");

router.post("/signup", express.json(), userController.addUser);
router.post("/signin/new_token", express.json(), userController.refreshToken);
router.post("/signin", express.json(), userController.signin);
router.get("/info", authenticate, express.json(), userController.getInfo);
router.get("/logout", authenticate, express.json(), userController.logout);

router.get("/file/:id", authenticate, fileController.getFileInfo);
router.post(
  "/file/upload",
  authenticate,
  upload.single("file"),
  fileController.upload
);
router.get("/file/download/:id", authenticate, fileController.download);
router.put(
  "/file/update/:id",
  authenticate,
  upload.single("file"),
  fileController.update
);
router.delete("/file/delete/:id", authenticate, fileController.deleteFile);

module.exports = router;
