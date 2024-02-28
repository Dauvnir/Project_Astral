const pool = require("./db");

//GET all manhwa list with searching

const getAllManhwa = async (req, res) => {
	try {
		const querySelectAll = await pool.query(`SELECT * FROM manhwa;`);
		res.json(querySelectAll.rows);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).send("Internal Server Error");
	}
};

//GET all manhwa list with searching
const getManhwaBySearch = async (req, res) => {
	try {
		const { search } = req.params;
		const querySelectAllSearch = await pool.query(
			`SELECT * FROM manhwa WHERE title ILIKE $1 || '%' ;`,
			[search]
		);
		res.json(querySelectAllSearch.rows);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).send("Internal Server Error");
	}
};

//GET all manhwa based on scanlation site
const getManhwaByScanlation = async (req, res) => {
	try {
		const { scanlation } = req.params;
		const querySelectAllScanlation = await pool.query(
			`SELECT * FROM manhwa WHERE scanlation_site = $1;`,
			[scanlation]
		);
		res.json(querySelectAllScanlation.rows);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).send("Internal Server Error");
	}
};

//GET all manhwa based on scanlation site + searching
const getManhwaByScanlationAndSearch = async (req, res) => {
	try {
		const { scanlation, search } = req.params;
		const querySelectAllScanlation = await pool.query(
			`SELECT * FROM manhwa WHERE scanlation_site = $1 AND title ILIKE $2 || '%';`,
			[scanlation, search]
		);
		res.json(querySelectAllScanlation.rows);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).send("Internal Server Error");
	}
};
//PATCH manhwa all chapter
const patchManhwaChapterAll = async (req, res) => {
	try {
		const { scanlation, search } = req.params;
		const updateManhwa = await pool.query(
			`UPDATE manhwa
			SET chapter = $1
			WHERE scanlation_site = $2 AND title = $3
			RETURNING *;`,
			[scanlation, search]
		);

		if (updateManhwa.rows.length === 0) {
			return res.status(404).json({ message: "Manhwa not found" });
		}

		res.json(updateManhwa.rows);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
};
//PATCH manhwa all chapter by scanlation site

//PATCH manhwa chapter -ver.manual
const patchManhwaChapter = async (req, res) => {
	try {
		const { chapter } = req.body;
		const { scanlation, search } = req.params;
		console.log(scanlation, search, chapter);
		const updateManhwa = await pool.query(
			`UPDATE manhwa
			SET chapter = $1
			WHERE scanlation_site = $2 AND title ILIKE $3 || '%'
			RETURNING *;`,
			[chapter, scanlation, search]
		);

		if (updateManhwa.rows.length === 0) {
			return res.status(404).json({ message: "Manhwa not found" });
		}

		res.json(updateManhwa.rows);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
};
// ADD new manhwa - ver.manual
const addManhwa = async (req, res) => {
	try {
		const { scanlation_site, title, srcimg, websiteurl, chapter } = req.body;
		const newManhwa = await pool.query(
			`INSERT INTO manhwa(scanlation_site, title, srcimg, websiteurl, chapter)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING *;`,
			[scanlation_site, title, srcimg, websiteurl, chapter]
		);

		res.status(201).json(newManhwa.rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
};

//ADD WHOLE LIBRARY
const addAllManhwa = async (req, res) => {
	try {
		const { getManhwaAsura } = await import("./ScanBot/ScanBot/asuraScraper.js");
		const { getManhwaVoid } = await import("./ScanBot/ScanBot/voidScraper.js");
		const { getManhwaFlame } = await import("./ScanBot/ScanBot/flameScraper.js");
		const { getManhwaNight } = await import("./ScanBot/ScanBot/nightscanScraper.js");
		const { getManhwaReaper } = await import("./ScanBot/ScanBot/reaperScraper.js");

		console.log("Starting asura");
		const dataAsura = await getManhwaAsura();

		console.log("Starting dataVoid");
		const dataVoid = await getManhwaVoid();

		console.log("Starting dataFlame");
		const dataFlame = await getManhwaFlame();

		console.log("Starting dataNight");
		const dataNight = await getManhwaNight();

		console.log("Starting dataReaper");
		const dataReaper = await getManhwaReaper();

		const data = dataAsura.concat(dataVoid, dataFlame, dataNight, dataReaper);

		const insertQuery = `
		INSERT INTO manhwa(scanlation_site, title, srcimg, websiteurl, chapter)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING *;`;

		for (const { scanlationSite, title, srcImg, websiteUrl, chapter } of data) {
			await pool.query(insertQuery, [scanlationSite, title, srcImg, websiteUrl, chapter]);
		}

		console.log("Data inserted successfully into the database.");
		// res.status(200).send("Data inserted successfully into the database.");
	} catch (error) {
		console.error("Error:", error);
		res.status(500).send("Internal Server Error");
	}
};

module.exports = {
	getAllManhwa,
	getManhwaBySearch,
	getManhwaByScanlation,
	getManhwaByScanlationAndSearch,
	patchManhwaChapter,
	patchManhwaChapterAll,
	addManhwa,
	addAllManhwa,
};
