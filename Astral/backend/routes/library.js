const express = require("express");
const router = express.Router();
const libraryController = require("../controllers/controllerBooks");
router.get("/", libraryController.libraryExists);
router.get("/fetch", libraryController.fetchLibrary);
module.exports = router;
