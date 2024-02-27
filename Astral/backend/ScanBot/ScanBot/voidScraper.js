import puppeteerExtra from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteerExtra.use(StealthPlugin()); //cloudflare bypass and blocking by sites

export const getManhwaVoid = async () => {
	//create browser
	const browser = await puppeteerExtra.launch({
		headless: true,
		defaultViewport: null,
	});
	let i = 1;
	let conditionMet = false;
	const scrapedData = [];
	let websiteUrl = ' ';
	let z = 0;
	do {
		if (z === 1) {
			websiteUrl = `https://hivescans.com/projects/page/${i}/`;
		}
		if (z === 0) {
			websiteUrl = `https://hivescans.com/projects/`;
			z++;
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
				//fetching all sub elements,  map() created new array that contains these two information as keys
				return Array.from(manhwaList).map((manhuaData) => {
					const anchorElement = manhuaData.querySelector('a');
					const title = anchorElement.getAttribute('title');
					const websiteUrl = anchorElement.href;

					const srcImg = anchorElement.querySelector('div.limit img').getAttribute('src');
					const chapter = anchorElement.querySelector('div.bigor div.adds div.epxs').innerText;
					const scanlationSite = 'Void';

					return { scanlationSite, title, srcImg, websiteUrl, chapter };
				});
			});

			if (manhwa.length === 0) {
				z++;
				if (z === 2) {
					conditionMet = true;
				}
			}

			scrapedData.push(...manhwa);

			await page.close();
		} catch (err) {
			console.log('This is Voidscan scraper error');
			console.error(err);
		}
		i++;
	} while (!conditionMet);
	await browser.close();

	console.log('Finished scraping data on Void.');

	return scrapedData;
};
