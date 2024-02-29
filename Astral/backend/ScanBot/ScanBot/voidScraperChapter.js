import puppeteer from "puppeteer";

export const getManhwaVoidChapter = async () => {
	//create browser
	const browser = await puppeteer.launch({
		headless: true,
		defaultViewport: null,
	});
	const scrapedData = [];
	const websiteUrl = "https://hivescans.com/";
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
			const manhwaList = document.querySelectorAll("div.uta");
			return Promise.all(
				Array.from(manhwaList).map(async (manhuaData) => {
					const chapter = manhuaData.querySelector("div.luf > ul > li:first-child > a").innerText;
					const title = manhuaData.querySelector("div.luf > a").getAttribute("title");
					const websiteUrl = manhuaData.querySelector("div.luf > a").href;
					const srcImg = manhuaData.querySelector("div.imgu > a > img").getAttribute("src");
					const scanlationSite = "Void";
					return { scanlationSite, title, chapter, srcImg, websiteUrl };
				})
			);
		});

		scrapedData.push(...manhwa);
		await page.close();
	} catch (err) {
		console.log("This is Void scraper error");
		console.error(err);
	}
	await browser.close();

	console.log("Finished scraping data on Void.");
	return scrapedData;
};
