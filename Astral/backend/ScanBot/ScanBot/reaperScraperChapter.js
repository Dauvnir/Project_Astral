import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

async function checkInternetConnection() {
    try {
        await fetch('https://www.google.com', { mode: 'no-cors' });
        return true;
    } catch (error) {
        throw new Error('No internet connection.');
    }
}

puppeteerExtra.use(StealthPlugin()); ////cloudflare bypass and blocking by sites

export const getManhwaReaperChapter = async () => {
	try {
        await checkInternetConnection();
    } catch (error) {
        console.error(error.message);
        throw error; // Throw the error to stop further execution
    }
	//create browser
	const browser = await puppeteerExtra.launch({
		headless: true,
		defaultViewport: null,
	});
	const scrapedData = [];
	let websiteUrl = `https://reaperscans.com/latest/comics`;
	try {
		//go to page
		const page = await browser.newPage();
		await page.setUserAgent(
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
		);
		await page.goto(websiteUrl, {
			// load, domcontentloaded,  networkidle0 / options
			waitUntil: ["networkidle2", "load"],
			timeout: 0,
		});
		await new Promise((resolve) => setTimeout(resolve, 2000)); //delaying code by 2sec
		// fetch data
		const manhwa = await page.evaluate(() => {
			Object.defineProperty(navigator, "webdriver", {
				get: () => false,
			});
			//get elements with  class, node list ?
			const manhwaList = document.querySelectorAll("div.grid > div.relative");
			//fetching all sub elements,  map() created new array that contains these two information as keys
			return Array.from(manhwaList).map((manhuaData) => {
				const title = manhuaData.querySelector("div:nth-child(2) > div > p >  a").innerText;
				const websiteUrl = manhuaData.querySelector("div:nth-child(2) > div > p > a").href;
				const chapter = manhuaData
					.querySelector("div:nth-child(2) > div:nth-child(1) > div > a:first-child")
					.childNodes[0].nodeValue.trim();
				const srcImg = manhuaData.querySelector("div:nth-child(1) > a > img").getAttribute("src");
				const scanlationSite = "Reaper";

				return { scanlationSite, title, chapter, websiteUrl, srcImg };
			});
		});

		scrapedData.push(...manhwa);

		await page.close();
	} catch (err) {
		console.log("This is Reaper scraper error");
		console.error(err);
	}
	await browser.close();

	console.log("Finished scraping data on Reaper.");
	return scrapedData;
};
