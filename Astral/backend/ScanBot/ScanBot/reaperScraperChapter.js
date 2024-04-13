import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

async function checkInternetConnection() {
	try {
		await fetch("https://www.google.com", { mode: "no-cors" });
		return true;
	} catch (error) {
		throw new Error("No internet connection.");
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
	const base64DataArray = [];
	try {
		//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		const page2 = await browser.newPage();
		await page2.setUserAgent(
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
		);
		await page2.goto(websiteUrl, {
			waitUntil: ["networkidle2", "load"], // load, domcontentloaded,  networkidle0,  networkidle2
			timeout: 0,
		});
		//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		for (const srcImg of scrapedData.map((item) => item.srcImg)) {
			const page2 = await browser.newPage();
			await page2.goto(srcImg, {
				waitUntil: ["networkidle2", "load"],
				timeout: 0,
			});
			const base64Data = await page2.evaluate(() => {
				let src = document.querySelector("img").getAttribute("src");

				async function parseToURIFormat(blobObject) {
					const reader = new FileReader();
					reader.readAsDataURL(blobObject);
					// eslint-disable-next-line no-unused-vars
					return new Promise((resolve, reject) => {
						reader.onload = (event) => {
							resolve(event.target.result);
						};
					});
				}

				async function srcImgToBlob(url) {
					const response = await fetch(url);
					const blob = await response.blob();
					const uri = await parseToURIFormat(blob);
					return uri;
				}

				let base64Image = srcImgToBlob(src);
				// console.log(base64Image);
				return base64Image;
			});
			base64DataArray.push(base64Data);
			// console.log(base64DataArray);
			await page2.close();
		}
	} catch (error) {
		console.error(error);
	}

	//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	await browser.close();
	console.log("Finished scraping data on Reaper.");
	for (let i = 0; i < scrapedData.length; i++) {
		if (i < base64DataArray.length) {
			scrapedData[i].srcImg = base64DataArray[i];
		}
	}
	// console.log(scrapedData);
	return scrapedData;
};
