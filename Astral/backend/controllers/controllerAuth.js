const pool = require("../db.js");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
	const { user, pwd } = req.body;

	// Fields are required
	if (!user || !pwd) return res.sendStatus(400);

	try {
		// Check if user exists
		const userData = await pool.query(
			"SELECT username, password FROM users WHERE username = $1",
			[user]
		);

		// User not found
		if (userData.rowCount === 0) return res.sendStatus(401);

		const hashedPassword = userData.rows[0].password;

		// Compare passwords
		const match = await bcrypt.compare(pwd, hashedPassword);

		if (match) {
			res.json({ success: `User ${user} is logged in!` });
		} else {
			res.sendStatus(401); // Unauthorized
		}
	} catch (error) {
		console.error("Error during login:", error);
		res.sendStatus(500); // Internal Server Error
	}
};

module.exports = { handleLogin };
