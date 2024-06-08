const express = require("express");
const router = express.Router();
const usersController = require("../controllers/controllerUsers");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list");

router.post("/update/password", usersController.updateUserPassword);
router.post("/update/email", usersController.updateUserEmail);
router.post("/update/nickname", usersController.updateUserNickname);
router.post("/delete", usersController.deleteUser);
router.post(
	"/create",
	verifyRoles(ROLES_LIST.Admin),
	usersController.createUser
);

module.exports = router;
