import puppeteer from 'puppeteer';

export const getManhwaAsura = async () => {
	//create browser
	const browser = await puppeteer.launch({
		headless: true,
		defaultViewport: null,
	});
	let i = 1;
	let conditionMet = false;
	const scrapedData = [];
	do {
		let websiteUrl = `https://asuratoon.com/manga/?page=${i}&order=update`;
		try {
			//go to page
			const page = await browser.newPage();
			await page.setUserAgent(
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
			);
			await page.goto(websiteUrl, {
				// load, domcontentloaded,  networkidle0
				waitUntil: ['networkidle2', 'load'],
			});
			await new Promise((resolve) => setTimeout(resolve, 2000)); //delaying code by 2sec

			// fetch data
			const manhwa = await page.evaluate(() => {
				//get elements with quote class, object
				const manhwaList = document.querySelectorAll('div.bsx');
				//fetching all sub elements,  map() created new array that contains these two information as keys
				return Array.from(manhwaList).map((manhuaData) => {
					const anchorElement = manhuaData.querySelector('a');
					const title = anchorElement.getAttribute('title');
					const websiteUrl = anchorElement.href;

					const srcImg = anchorElement.querySelector('div.limit img').getAttribute('src');
					const chapter = anchorElement.querySelector('div.bigor div.adds div.epxs').innerText;
					const scanlationSite = 'Asura';

					return { scanlationSite, title, srcImg, websiteUrl, chapter };
				});
			});

			if (manhwa.length === 0) {
				conditionMet = true;
				console.log('No manhwa found on this page.');
			}

			scrapedData.push(...manhwa);

			await page.close();
		} catch (err) {
			console.log('This is Asura scraper');
			console.error(err);
		}
		i++;
	} while (!conditionMet);
	await browser.close();

	console.log(scrapedData);
	return scrapedData;
};

getManhwaAsura();
