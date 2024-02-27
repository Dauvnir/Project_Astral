const express = require("express");
const router = express.Router();
const manhwaController = require("./controller");

router.get("/", manhwaController.getAllManhwa);
router.get("/:search", manhwaController.getManhwaBySearch);
router.get("/site/:scanlation", manhwaController.getManhwaByScanlation);
router.get("/site/:scanlation/:search", manhwaController.getManhwaByScanlationAndSearch);
router.patch("/methods/patch/:scanlation/:search", manhwaController.patchManhwaChapter);
router.post("/methods/add", manhwaController.addManhwa);
router.post("/methods/addAll", manhwaController.addAllManhwa);

module.exports = router;
