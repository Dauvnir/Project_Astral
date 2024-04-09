const express = require("express");
const router = express.Router();
const manhwaController = require("./controller");

router.get("/", manhwaController.getAllManhwa);
router.get("/images", manhwaController.getManhwaImages);
router.get("/:search", manhwaController.getManhwaBySearch);
router.get("/manual/:id", manhwaController.getManhwaBasedOnId);
router.get("/site/:scanlation", manhwaController.getManhwaByScanlation);
router.get("/site/:scanlation/:search", manhwaController.getManhwaByScanlationAndSearch);
router.patch("/methods/patch/all", manhwaController.patchManhwaChapterAll);
router.patch("/methods/patch/all/:scanlation", manhwaController.patchManhwaChapterAllScanlation);
router.post("/methods/add", manhwaController.addManhwa);
router.post("/methods/addAll", manhwaController.addAllManhwa);

module.exports = router;
