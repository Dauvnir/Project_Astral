const pool = require("../db.js");

const libraryExists = async (req, res) => {
	let isExists = false;
	const { username } = req.query;
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
	const { username } = req.query;
	const query = `
    SELECT um.manhwa_id, um.user_chapter  
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
module.exports = { libraryExists, fetchLibrary };
