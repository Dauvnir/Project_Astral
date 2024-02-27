/* eslint-disable no-undef */
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

// Connecting to database
pool
	.connect()
	.then(() => {
		console.log('Connected to the database');
		app.listen(3000, () => {
			console.log('Server is listening on port 3000');
		});
	})
	.catch((error) => {
		console.error('Error connecting to the database:', error);
	});

//ROUTES//

// ADD new manhwa
app.post('/manhwas/add', async (req, res) => {
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
	}
});

//GET all manhwa list
app.get('/manhwas/library', async (req, res) => {
	try {
		const querySelectAll = await pool.query(`SELECT * FROM manhwa;`);
		res.json(querySelectAll.rows);
	} catch (error) {
		console.error('Error:', error);
		res.status(500).send('Internal Server Error');
	}
});

//GET all manhwa based on scanlation site
app.get('/manhwas/library/:scanlation', async (req, res) => {
	try {
		const { scanlation } = req.params;
		const querySelectAllScanlation = await pool.query(
			`SELECT * FROM manhwa WHERE scanlation_site = $1;`,
			[scanlation]
		);
		res.json(querySelectAllScanlation.rows);
	} catch (error) {
		console.error('Error:', error);
		res.status(500).send('Internal Server Error');
	}
});
//DOWNLOAD WHOLE LIBRARY
app.post('/manhwas/library/addall', async (req, res) => {
	try {
		const { getManhwaAsura } = await import('./ScanBot/ScanBot/asuraScraper.js');
		const { getManhwaVoid } = await import('./ScanBot/ScanBot/voidScraper.js');
		const { getManhwaFlame } = await import('./ScanBot/ScanBot/flameScraper.js');
		const { getManhwaNight } = await import('./ScanBot/ScanBot/nightscanScraper.js');
		const { getManhwaReaper } = await import('./ScanBot/ScanBot/reaperScraper.js');

		console.log('Starting asura');
		const dataAsura = await getManhwaAsura();

		console.log('Starting dataVoid');
		const dataVoid = await getManhwaVoid();

		console.log('Starting dataFlame');
		const dataFlame = await getManhwaFlame();

		console.log('Starting dataNight');
		const dataNight = await getManhwaNight();

		console.log('Starting dataReaper');
		const dataReaper = await getManhwaReaper();

		const data = dataAsura.concat(dataVoid, dataFlame, dataNight, dataReaper);

		const insertQuery = `
		INSERT INTO manhwa(scanlation_site, title, srcimg, websiteurl, chapter)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING *;`;

		for (const { scanlationSite, title, srcImg, websiteUrl, chapter } of data) {
			await pool.query(insertQuery, [scanlationSite, title, srcImg, websiteUrl, chapter]);
		}

		console.log('Data inserted successfully into the database.');
		res.status(200).send('Data inserted successfully into the database.');
	} catch (error) {
		console.error('Error:', error);
		res.status(500).send('Internal Server Error');
	}
});

process.on('exit', () => {
	pool.end();
});
