import puppeteer from "puppeteer";
async function checkInternetConnection() {
	try {
		await fetch("https://www.google.com", { mode: "no-cors" });
		return true;
	} catch (error) {
		throw new Error("No internet connection.");
	}
}
const scrollPageToBottom = async (page) => {
	try {
		await checkInternetConnection();
	} catch (error) {
		console.error(error.message);
		throw error; // Throw the error to stop further execution
	}
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
		console.log("This is Night scraper error");
		console.error(err);
	}
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
				console.log(base64Image);
				return base64Image;
			});
			base64DataArray.push(base64Data);
			console.log(base64DataArray);
			await page2.close();
		}
	} catch (error) {
		console.error(error);
	}

	//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	await browser.close();
	console.log("Finished scraping data on Night.");
	for (let i = 0; i < scrapedData.length; i++) {
		if (i < base64DataArray.length) {
			scrapedData[i].srcImg = base64DataArray[i];
		}
	}
	console.log(scrapedData);
	return scrapedData;
};
