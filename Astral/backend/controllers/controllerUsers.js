const pool = require("../db.js");
const bcrypt = require("bcrypt");
const ROLES_LIST = require("../config/roles_list.js");
// eslint-disable-next-line no-unused-vars
const getUsers = async (req, res) => {
	const selectQuery = "SELECT user_id, username, password FROM users;";
	try {
		const userList = await pool.query(selectQuery);
		console.log(userList);
		res.sendStatus(200);
	} catch (error) {
		console.error("Error while returning users:", error);
		res.sendStatus(500);
	}
};

const updateUserPassword = async (req, res) => {
	const { username, password, newPassword } = req.body;
	if (!username || !password) return res.sendStatus(400);
	try {
		const isExisted = await pool.query(
			"SELECT username, password FROM users WHERE username = $1;",
			[username]
		);
		if (isExisted.rowCount === 0) return res.sendStatus(401);

		const hashedPassword = isExisted.rows[0].password;

		const match = await bcrypt.compare(password, hashedPassword);

		if (match) {
			const updateQuery = "UPDATE users SET password = $1 WHERE username = $2;";
			const hashedNewPassword = await bcrypt.hash(newPassword, 10);
			try {
				await pool.query(updateQuery, [hashedNewPassword, username]);
				res.sendStatus(200);
			} catch (error) {
				console.error("Error while updating user:", error);
				res.sendStatus(500);
			}
		} else {
			console.error("Passwords do not match.");
			res.sendStatus(401);
		}
	} catch (error) {
		console.error("Error while searching user:", error);
		res.sendStatus(500);
	}
};
const updateUserEmail = async (req, res) => {
	const { username, email } = req.body;
	if (!email) return res.sendStatus(400);
	try {
		const isExisted = await pool.query(
			"SELECT username, password FROM users WHERE username = $1;",
			[username]
		);
		if (isExisted.rowCount === 0) return res.sendStatus(401);
		const updateQuery = "UPDATE users SET email = $1 WHERE username = $2;";
		try {
			await pool.query(updateQuery, [email, username]);
			res.sendStatus(200);
		} catch (error) {
			console.error("Error while updating user:", error);
			res.sendStatus(500);
		}
	} catch (error) {
		console.error("Error while searching user:", error);
		res.sendStatus(500);
	}
};
const deleteUser = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) return res.sendStatus(400);

	try {
		const userData = await pool.query(
			"SELECT username, password FROM users WHERE username = $1",
			[username]
		);

		// User not found
		if (userData.rowCount === 0) return res.sendStatus(401);

		const hashedPassword = userData.rows[0].password;

		// Compare passwords
		const match = await bcrypt.compare(password, hashedPassword);

		if (match) {
			await pool.query("DELETE FROM users WHERE username = $1", [username]);
			res.sendStatus(200);
		} else {
			res.sendStatus(401); // Unauthorized
		}
	} catch (error) {
		console.error("Error during deleting account:", error);
		res.sendStatus(500); // Internal Server Error
	}
};

const createUser = async (req, res) => {
	const { user, pwd, email } = req.body;
	//Check if it is empty
	if (!user || !pwd || !email) return res.sendStatus(400);
	//If username name exist
	const duplicate = await pool.query(
		"SELECT username FROM users WHERE username=$1",
		[user]
	);
	const hasDuplicate = duplicate.rowCount > 0;
	if (hasDuplicate) return res.sendStatus(409);
	// Query user to database
	try {
		//hash pwd
		const hashedPwd = await bcrypt.hash(pwd, 10);
		//query to db
		const query =
			"INSERT INTO users(username, password, email) VALUES ($1, $2, $3) RETURNING user_id;";
		const insertUser = await pool.query(query, [user, hashedPwd, email]);
		const userID = insertUser.rows[0].user_id;
		//add user role
		await pool.query(
			"INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2);",
			[userID, ROLES_LIST.User]
		);
		res.status(201).json({ succes: `New user ${user} created!` });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getUsers,
	deleteUser,
	updateUserPassword,
	updateUserEmail,
	createUser,
};
