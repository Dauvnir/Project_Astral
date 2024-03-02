import puppeteer from "puppeteer";
async function checkInternetConnection() {
    try {
        await fetch('https://www.google.com', { mode: 'no-cors' });
        return true;
    } catch (error) {
        throw new Error('No internet connection.');
    }
}
export const getManhwaFlameChapter = async () => {
	try {
        await checkInternetConnection();
    } catch (error) {
        console.error(error.message);
        throw error; // Throw the error to stop further execution
    }
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
			const manhwaList = document.querySelectorAll("div.bs.styletere > div.bsx");
			return Promise.all(
				Array.from(manhwaList).map(async (manhuaData) => {
					const chapter = manhuaData.querySelector(
						"div.bigor > div:nth-child(2) > a:first-child > div > div:first-child"
					).innerText;
					const title = manhuaData.querySelector("a").getAttribute("title");
					const websiteUrl = manhuaData.querySelector("a").href;
					const srcImg = manhuaData.querySelector("a > div.limit > img").getAttribute("src");
					const scanlationSite = "Flame";
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

	console.log("Finished scraping data on Flame.");
	return scrapedData;
};
