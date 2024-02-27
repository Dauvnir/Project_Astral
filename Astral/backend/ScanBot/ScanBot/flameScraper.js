import puppeteer from 'puppeteer';

export const getManhwaFlame = async () => {
	//create browser
	const browser = await puppeteer.launch({
		headless: true,
		defaultViewport: null,
	});
	let i = 1;
	let conditionMet = false;
	const scrapedData = [];
	let websiteUrl = '';
	let z = 0;
	do {
		if (z === 0) {
			websiteUrl = `https://flamecomics.com/series/?page=${i}&type=manhwa`; // Initial URL
		}
		if (z === 1) {
			z++;
			websiteUrl = `https://flamecomics.com/series/?status=&type=manhua&order=`; // Updated URL
		}
		try {
			//go to page
			const page = await browser.newPage();
			await page.setUserAgent(
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
			);
			await page.goto(websiteUrl, {
				// load, domcontentloaded,  networkidle0
				waitUntil: ['networkidle2', 'load'],
				timeout: 0,
			});
			await new Promise((resolve) => setTimeout(resolve, 2000)); //delaying code by 2sec

			// fetch data
			const manhwa = await page.evaluate(() => {
				//get elements with quote class, object
				const manhwaList = document.querySelectorAll('div.bsx');

				const getChapterInformation = async (websiteUrl) => {
					const response = await fetch(websiteUrl);
					const html = await response.text();
					const parser = new DOMParser();
					const doc = parser.parseFromString(html, 'text/html');
					return doc.querySelector('span.epcur').innerText;
				};

				//fetching all sub elements,  map() created new array that contains these two information as keys
				return Promise.all(
					Array.from(manhwaList).map(async (manhuaData) => {
						const anchorElement = manhuaData.querySelector('a');
						const title = anchorElement.getAttribute('title');
						const websiteUrl = anchorElement.href;

						const srcImg = anchorElement.querySelector('div.limit img').getAttribute('src');
						const scanlationSite = 'Flame';

						const chapterInformation = await getChapterInformation(websiteUrl);
						return { scanlationSite, title, srcImg, websiteUrl, chapterInformation };
					})
				);
			});

			if (manhwa.length === 0) {
				z++;
				i = 0;
				if (z === 2) {
					conditionMet = true;
				}
			}
			if (z === 2) {
				conditionMet = true;
			}

			scrapedData.push(...manhwa);
			await page.close();
		} catch (err) {
			console.log('This is Flame scraper error');
			console.error(err);
		}
		i++;
	} while (!conditionMet);
	await browser.close();

	console.log('Finished scraping data on Flame.');
	return scrapedData;
};
