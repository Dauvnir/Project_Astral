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
			`SELECT manhwa_id, title, chapter FROM manhwa WHERE scanlation_site = $1;`,
			[scanlation]
		);
		res.json(querySelectAllScanlation.rows);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).send("Internal Server Error");
	}
};
const getManhwaBasedOnId = async (req, res) => {
	try {
		const { id } = req.params;
		const querySelectManhwaBasedOnId = await pool.query(
			`SELECT manhwa_id, title, chapter, scanlation_site,  srcimg, websiteurl FROM manhwa WHERE manhwa_id = $1;`,
			[id]
		);
		res.json(querySelectManhwaBasedOnId.rows);
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
//GET ALL IMAGES
const getManhwaImages = async (req, res) => {
	try {
		const querySelectAllImages = await pool.query(
			`SELECT manhwa_id, title, chapter, scanlation_site,  websiteurl, srcimg FROM manhwa WHERE scanlation_site = 'Asura';`
		);
		res.json(querySelectAllImages.rows);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).send("Internal Server Error");
	}
};
//PATCH manhwa all chapter + insert new one if appeard based on scanlation
const patchManhwaChapterAllScanlation = async (req, res) => {
	try {
		let data;
		let scraperModule;
		const { scanlation } = req.params;
		switch (scanlation.toLowerCase()) {
			case "asura":
				console.log("Starting dataAsura");
				scraperModule = await import("./ScanBot/ScanBot/asuraScraperChapter.js");
				data = await scraperModule.getManhwaAsuraChapter();
				break;
			case "flame":
				console.log("Starting dataFlame");
				scraperModule = await import("./ScanBot/ScanBot/flameScraperChapter.js");
				data = await scraperModule.getManhwaFlameChapter();
				break;
			case "void":
				console.log("Starting dataVoid");
				scraperModule = await import("./ScanBot/ScanBot/voidScraperChapter.js");
				data = await scraperModule.getManhwaVoidChapter();
				break;
			case "night":
				console.log("Starting dataNight");
				scraperModule = await import("./ScanBot/ScanBot/nightscanScraperChapter.js");
				data = await scraperModule.getManhwaNightChapter();
				break;
			case "reaper":
				console.log("Starting dataReaper");
				scraperModule = await import("./ScanBot/ScanBot/reaperScraperChapter.js");
				data = await scraperModule.getManhwaReaperChapter();
				break;
			default:
				console.error("Not found scanlation site");
				return res.status(404).send("Not found scanlation site");
		}

		const updateQuery = `UPDATE manhwa
			SET chapter = $1
			WHERE scanlation_site = $2 AND title = $3
			RETURNING *;`;

		const selectQuery = `SELECT  * FROM manhwa WHERE scanlation_site = $1 AND title = $2;`;
		const insertQuery = `INSERT INTO manhwa(scanlation_site, title, srcimg, websiteurl, chapter)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING *;`;
		const updatedRows = [];

		for (const { scanlationSite, title, chapter, srcImg, websiteUrl } of data) {
			const result = await pool.query(updateQuery, [chapter, scanlationSite, title]);
			updatedRows.push(result.rows[0]);
			console.log(`Updated manhwa inserted: ${title}, ${chapter}, ${scanlationSite}`);
			const check = await pool.query(selectQuery, [scanlationSite, title]);
			if (check.rows.length === 0) {
				try {
					// eslint-disable-next-line no-unused-vars
					const newManhwa = await pool.query(insertQuery, [
						scanlationSite,
						title,
						srcImg,
						websiteUrl,
						chapter,
					]);
					console.log(`New manhwa inserted: ${title}, ${chapter}, ${scanlationSite}`);
				} catch (error) {
					console.error(`Error inserting new manhwa ${title}: ${error.message}`);
				}
			}
		}
		console.log("Data inserted successfully into the database.");
		res.json(updatedRows);
	} catch (error) {
		console.error(`Error in patchManhwaChapterAll: ${error.message}`);
		res.status(500).send("Internal Server Error");
	}
};

//PATCH manhwa all chapter + insert new one if appeard
const patchManhwaChapterAll = async (req, res) => {
	try {
		const { getManhwaAsuraChapter } = await import("./ScanBot/ScanBot/asuraScraperChapter.js");
		const { getManhwaVoidChapter } = await import("./ScanBot/ScanBot/voidScraperChapter.js");
		const { getManhwaFlameChapter } = await import("./ScanBot/ScanBot/flameScraperChapter.js");
		const { getManhwaNightChapter } = await import("./ScanBot/ScanBot/nightscanScraperChapter.js");
		const { getManhwaReaperChapter } = await import("./ScanBot/ScanBot/reaperScraperChapter.js");

		console.log("Starting asura");
		const dataAsura = await getManhwaAsuraChapter();

		console.log("Starting dataVoid");
		const dataVoid = await getManhwaVoidChapter();

		console.log("Starting dataFlame");
		const dataFlame = await getManhwaFlameChapter();

		console.log("Starting dataNight");
		const dataNight = await getManhwaNightChapter();

		console.log("Starting dataReaper");
		const dataReaper = await getManhwaReaperChapter();

		const data = dataFlame.concat(dataVoid, dataNight, dataReaper, dataAsura);

		const updateQuery = `UPDATE manhwa
			SET chapter = $1
			WHERE scanlation_site = $2 AND title = $3
			RETURNING *;`;

		const selectQuery = `SELECT  * FROM manhwa WHERE scanlation_site = $1 AND title = $2;`;
		const insertQuery = `INSERT INTO manhwa(scanlation_site, title, srcimg, websiteurl, chapter)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING *;`;
		const updatedRows = [];

		for (const { scanlationSite, title, chapter, srcImg, websiteUrl } of data) {
			const result = await pool.query(updateQuery, [chapter, scanlationSite, title]);
			updatedRows.push(result.rows[0]);
			console.log(`Updated manhwa inserted: ${title}, ${chapter}, ${scanlationSite}`);
			const check = await pool.query(selectQuery, [scanlationSite, title]);
			if (check.rows.length === 0) {
				try {
					// eslint-disable-next-line no-unused-vars
					const newManhwa = await pool.query(insertQuery, [
						scanlationSite,
						title,
						srcImg,
						websiteUrl,
						chapter,
					]);
					console.log(`New manhwa inserted: ${title}, ${chapter}, ${scanlationSite}`);
				} catch (error) {
					console.error(`Error inserting new manhwa ${title}: ${error.message}`);
				}
			}
		}
		console.log("Data inserted successfully into the database.");
	} catch (error) {
		console.error(`Error in patchManhwaChapterAll: ${error.message}`);
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
	getManhwaImages,
	getManhwaBasedOnId,
	patchManhwaChapterAll,
	patchManhwaChapterAllScanlation,
	addManhwa,
	addAllManhwa,
};
