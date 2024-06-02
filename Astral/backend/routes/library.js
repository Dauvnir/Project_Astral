const express = require("express");
const router = express.Router();
const libraryController = require("../controllers/controllerBooks");
router.post("/", libraryController.libraryExists);
router.post("/fetch", libraryController.fetchLibrary);
router.post("/add", libraryController.addBook);
router.post("/remove", libraryController.removeBook);
router.post("/favourite", libraryController.toggleFavourite);
module.exports = router;
