/* eslint-disable no-undef */
const express = require('express');
const { getManhwaAsura } = require('./ScanBot/ScanBot/asuraScraper');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
	try {
		// Get data from Asura scraper
		const data = await getManhwaAsura();
		// Render the 'index.ejs' template and pass the data to it
		res.render('index', { data });
	} catch (error) {
		console.error('Error:', error);
		res.status(500).send('Internal Server Error');
	}
});

app.listen(port);
