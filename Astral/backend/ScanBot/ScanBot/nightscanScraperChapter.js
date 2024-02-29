import puppeteer from "puppeteer";

const scrollPageToBottom = async (page) => {
	await page.evaluate(async () => {
		await new Promise((resolve) => {
			let totalHeight = 0;
			const distance = 100; // Scroll distance
			const delay = 100; // Delay between scrolls

			const timer = setInterval(() => {
				const scrollHeight = document.body.scrollHeight;
				window.scrollBy(0, distance);
				totalHeight += distance;

				if (totalHeight >= scrollHeight) {
					clearInterval(timer);
					resolve();
				}
			}, delay);
		});
	});
};

export const getManhwaNightChapter = async () => {
	//create browser
	const browser = await puppeteer.launch({
		headless: true,
		defaultViewport: null,
	});
	const scrapedData = [];
	const websiteUrl = "https://night-scans.com/manga/?order=update";
	try {
		//go to page
		const page = await browser.newPage();
		await page.setUserAgent(
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
		);
		await page.goto(websiteUrl, {
			waitUntil: ["networkidle2", "load"], // load, domcontentloaded,  networkidle0,  networkidle2
			timeout: 0,
		});
		await scrollPageToBottom(page);
		await new Promise((resolve) => setTimeout(resolve, 2000)); //delaying code by 2sec

		// fetch data
		const manhwa = await page.evaluate(() => {
			const manhwaList = document.querySelectorAll("div.bsx");
			return Promise.all(
				Array.from(manhwaList).map(async (manhuaData) => {
					const chapter = manhuaData.querySelector("div.bigor > div.adds > div.epxs").innerText;
					const title = manhuaData.querySelector("a").getAttribute("title");
					const websiteUrl = manhuaData.querySelector("a").href;
					const srcImg = manhuaData.querySelector("a > div > img").getAttribute("src");
					const scanlationSite = "Night";
					return { scanlationSite, title, chapter, websiteUrl, srcImg };
				})
			);
		});

		scrapedData.push(...manhwa);
		await page.close();
	} catch (err) {
		console.log("This is Flame scraper error");
		console.error(err);
	}
	await browser.close();

	console.log("Finished scraping data on Night.");
	return scrapedData;
};
