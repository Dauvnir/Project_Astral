const express = require("express");
const router = express.Router();
const usersController = require("../controllers/controllerUsers");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list");

router.get("/get", usersController.getUsers);
router.delete(
	"/delete/:id",
	verifyRoles(ROLES_LIST.Admin),
	usersController.deleteUser
);
router.put(
	"/update/password",
	verifyRoles(ROLES_LIST.Admin),
	usersController.updateUserPassword
);
router.put(
	"/update/email",
	verifyRoles(ROLES_LIST.Admin),
	usersController.updateUserEmail
);
router.post(
	"/create",
	verifyRoles(ROLES_LIST.Admin),
	usersController.createUser
);

module.exports = router;
