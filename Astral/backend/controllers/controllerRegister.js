const pool = require("../db.js");
const bcrypt = require("bcrypt");

const handlerNewUser = async (req, res) => {
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
		await pool.query(
			"INSERT INTO users(username, password, email) VALUES ($1, $2, $3);",
			[user, hashedPwd, email]
		);
		res.status(201).json({ succes: `New user ${user} created!` });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { handlerNewUser };
