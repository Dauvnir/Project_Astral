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

export const getManhwaReaper = async () => {
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
	let i = 1;
	let conditionMet = false;
	const scrapedData = [];
	do {
		let websiteUrl = `https://reaperscans.com/comics?page=${i}`;
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
				const manhwaList = document.querySelectorAll(
					"main > div:nth-child(2) > div > div:nth-child(1) > div > li"
				);
				//fetching all sub elements,  map() created new array that contains these two information as keys
				return Array.from(manhwaList).map((manhuaData) => {
					const anchorElement = manhuaData.querySelector("div > a");
					const websiteUrl = anchorElement.href;
					const title = anchorElement.querySelector("img").getAttribute("alt");
					const srcImg = anchorElement.querySelector("img").getAttribute("src");
					const chapter = manhuaData.querySelector("div > dl").innerText;
					const scanlationSite = "Reaper";

					return { scanlationSite, title, srcImg, websiteUrl, chapter };
				});
			});

			scrapedData.push(...manhwa);

			if (manhwa.length === 0) {
				conditionMet = true;
			}

			await page.close();
		} catch (err) {
			console.log("This is Reaper scraper error");
			console.error(err);
		}
		i++;
	} while (!conditionMet);
	const base64DataArray = [];
	let websiteUrl = "https://reaperscans.com/";
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
		for (let srcImg of scrapedData.map((item) => item.srcImg)) {
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
				console.log(base64Image);
				return base64Image;
			});
			base64DataArray.push(base64Data);
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
	console.log(scrapedData);
	return scrapedData;
};
