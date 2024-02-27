import puppeteerExtra from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteerExtra.use(StealthPlugin()); ////cloudflare bypass and blocking by sites

export const getManhwaReaper = async () => {
	//create browser
	const browser = await puppeteerExtra.launch({
		headless: true,
		defaultViewport: null,
	});
	let i = 1;
	let conditionMet = false;
	const scrapedData = [];
	do {
		let websiteUrl = `https://reaperscans.com/comics?page=${i}`;
		try {
			//go to page
			const page = await browser.newPage();
			await page.setUserAgent(
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
			);
			await page.goto(websiteUrl, {
				// load, domcontentloaded,  networkidle0 / options
				waitUntil: ['networkidle2', 'load'],
				timeout: 0,
			});
			await new Promise((resolve) => setTimeout(resolve, 2000)); //delaying code by 2sec
			// fetch data
			const manhwa = await page.evaluate(() => {
				Object.defineProperty(navigator, 'webdriver', {
					get: () => false,
				});
				//get elements with  class, node list ?
				const manhwaList = document.querySelectorAll(
					'main > div:nth-child(2) > div > div:nth-child(1) > div > li'
				);
				//fetching all sub elements,  map() created new array that contains these two information as keys
				return Array.from(manhwaList).map((manhuaData) => {
					const anchorElement = manhuaData.querySelector('div > a');
					const websiteUrl = anchorElement.href;
					const title = anchorElement.querySelector('img').getAttribute('alt');
					const srcImg = anchorElement.querySelector('img').getAttribute('src');
					const chapter = manhuaData.querySelector('div > dl').innerText;
					const scanlationSite = 'Reaper';

					return { scanlationSite, title, srcImg, websiteUrl, chapter };
				});
			});

			scrapedData.push(...manhwa);

			if (manhwa.length === 0) {
				conditionMet = true;
			}

			await page.close();
		} catch (err) {
			console.log('This is Reaper scraper error');
			console.error(err);
		}
		i++;
	} while (!conditionMet);
	await browser.close();

	console.log('Finished scraping data on Reaper.');

	return scrapedData;
};
