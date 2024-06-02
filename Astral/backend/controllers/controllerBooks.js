const pool = require("../db.js");

const libraryExists = async (req, res) => {
	let isExists = false;
	const { username } = req.body;

	const query = `
        SELECT 1
        FROM UserManhwa um
        JOIN Users u ON um.user_id = u.user_id
        WHERE u.username = $1
        LIMIT 1;
    `;
	try {
		const response = await pool.query(query, [username]);
		if (response.rowCount > 0) {
			isExists = true;
		}
		return res.status(200).json({ exists: isExists });
	} catch (error) {
		console.error("Database query error:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

const fetchLibrary = async (req, res) => {
	const { username } = req.body;
	const query = `
    SELECT um.manhwa_id, um.user_chapter, um.is_favourite
    FROM UserManhwa um 
    JOIN Users u ON um.user_id = u.user_id 
    JOIN Manhwa m ON um.manhwa_id = m.manhwa_id 
    WHERE u.username = $1;
`;
	try {
		const result = await pool.query(query, [username]);
		const library = result.rows;
		return res.status(200).json({ library: library });
	} catch (error) {
		console.error("Database query error:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

const addBook = async (req, res) => {
	const { username, manhwa_id, user_chapter } = req.body;
	const findUserIDQuery = `SELECT user_id from users where username = $1;`;
	const addToDB =
		"INSERT INTO UserManhwa (user_id, manhwa_id, user_chapter) VALUES ($1, $2, $3);";
	try {
		const userResult = await pool.query(findUserIDQuery, [username]);
		if (userResult.rows.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}
		const userID = userResult.rows[0].user_id;
		await pool.query(addToDB, [userID, manhwa_id, user_chapter]);
		return res.status(200).json({ message: "Book added successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};
const removeBook = async (req, res) => {
	const { username, manhwa_id } = req.body;
	const findUserIDQuery = `SELECT user_id from users where username = $1;`;
	const removeFromDB =
		"DELETE FROM UserManhwa where user_id = $1 and manhwa_id = $2";
	try {
		const userResult = await pool.query(findUserIDQuery, [username]);
		if (userResult.rows.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}
		const userID = userResult.rows[0].user_id;
		await pool.query(removeFromDB, [userID, manhwa_id]);
		return res.status(200).json({ message: "Removed succesfuly" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};
const toggleFavourite = async (req, res) => {
	const { username, manhwa_id, is_favourite } = req.body;
	const queryUserID = `SELECT user_id from users where username = $1;`;
	const toggleQuery = `UPDATE UserManhwa
	SET is_favourite = $1
	WHERE user_id = $2 AND manhwa_id = $3;`;
	try {
		const userResult = await pool.query(queryUserID, [username]);
		if (userResult.rows.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}
		const userID = userResult.rows[0].user_id;
		await pool.query(toggleQuery, [!is_favourite, userID, manhwa_id]);
		return res
			.status(200)
			.json({ message: "Toggled status favoured successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};
module.exports = {
	libraryExists,
	fetchLibrary,
	addBook,
	removeBook,
	toggleFavourite,
};
