import puppeteer from "puppeteer";

export const getManhwaFlameChapterInformation = async () => {
	//create browser
	const browser = await puppeteer.launch({
		headless: true,
		defaultViewport: null,
	});
	const scrapedData = [];
	const websiteUrl = "https://flamecomics.com/";
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
		await new Promise((resolve) => setTimeout(resolve, 2000)); //delaying code by 2sec

		// fetch data
		const manhwa = await page.evaluate(() => {
			const manhwaList = document.querySelectorAll("div.chapter-list");
			return Promise.all(
				Array.from(manhwaList).map(async (manhuaData) => {
					const chapter = manhuaData.querySelector("a:first-child > div.adds > div.epxs").innerText;
					const title = manhuaData.querySelector("a:last-child").getAttribute("title");
					const scanlationSite = "Flame";
					return { scanlationSite, title, chapter };
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

	console.log("Finished scraping data on Flame.");
	return scrapedData;
};
