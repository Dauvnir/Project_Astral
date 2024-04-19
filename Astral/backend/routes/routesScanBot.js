const express = require("express");
const router = express.Router();
const manhwaController = require("../controllers/controllerScanBot");

router.get("/methods/get/all", manhwaController.getAllManhwa);
router.get("/methods/get/manhwa", manhwaController.getManhwaData);
router.get("/methods/get/images/:id", manhwaController.getImages);
router.get("/methods/get/:search", manhwaController.getManhwaBySearch);
router.get("/methods/get/manhwa/:id", manhwaController.getManhwaBasedOnId);
router.get("/methods/get/site/:scanlation", manhwaController.getManhwaByScanlation);
router.get("/methods/get/site/:scanlation/:search", manhwaController.getManhwaByScanlationAndSearch);
router.patch("/methods/patch/all", manhwaController.patchManhwaChapterAll);
router.patch("/methods/patch/all/:scanlation", manhwaController.patchManhwaChapterAllScanlation);
router.post("/methods/post/add", manhwaController.addManhwa);
router.post("/methods/post/addAll", manhwaController.addAllManhwa);

module.exports = router;
