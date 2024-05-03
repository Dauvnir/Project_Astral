import Dexie from "dexie";
import axios from "axios";
export const database = new Dexie("manhwa_list");
database.version(1).stores({
	manhwas: "++i, manhwa_id, srcimg, scanlation_site, title, websiteUrl, chapter", // Define your Dexie schema
});
database.version(2).stores({
	metadata: "i++, lastUpdate",
});
export function isDatabasePopulated() {
	return database.manhwas.count().then((countedValue) => countedValue > 0);
}

export async function populateDatabase(fetchedData) {
	const check = await database.manhwas.toArray();
	if (check.length == 0) {
		return await database.manhwas
			.bulkPut(fetchedData.map((item) => ({ ...item, srcimg: " " })))
			.then(() => {
				console.log("Database populated.");
			})
			.catch((error) => {
				console.error("Error while populating database: ", error);
				throw error;
			});
	} else {
		console.log("Called twice by strict mode.");
	}
}

export async function fetchDataAndPopulateDatabase() {
	return axios
		.get("http://localhost:3000/manhwas/methods/get/manhwa")
		.then(async (responseFromServer) => {
			const data = await responseFromServer.data;
			//add Update time stamp
			await database.metadata.put({ lastUpdate: new Date() });
			return await populateDatabase(data);
		})
		.catch((error) => {
			console.error("Error fetching data", error);
			throw error;
		});
}

export async function initializeDatabase() {
	try {
		return await isDatabasePopulated().then(async (isPopulated) => {
			if (!isPopulated) {
				return await fetchDataAndPopulateDatabase();
			} else {
				console.log("Database is already populated");
			}
		});
	} catch (error) {
		console.error("Error while populating", error);
		throw error;
	}
}

export async function fetchDataFromDatabase() {
	return axios
		.get("http://localhost:3000/manhwas/methods/get/site/Asura")
		.then((res) => {
			const data = res.data;
			console.log("Data downloaded from server");
			return data;
		})
		.catch((error) => {
			console.error("Error fetching data", error);
			throw error;
		});
}

export const connectToDatabase = async () => {
	await database.open();
	const isOpen = database.isOpen();
	try {
		if (isOpen) {
			console.log("Connected to database");
		}
	} catch (error) {
		console.error("Error connecting to database:", error);
		throw error;
	}
};

export async function compareDatabase() {
	await connectToDatabase();
	const indexedDbData = await database.manhwas.toArray();
	const dbData = await fetchDataFromDatabase();
	// console.log(dbData);
	if (indexedDbData.length === 0 || dbData.length === 0) {
		console.error("Indexed DB data or fetched data is empty.");
		return;
	}
	let differencesInChapter = [];

	dbData.forEach(async (item) => {
		let dataItem = indexedDbData.find((dbDataItem) => dbDataItem.manhwa_id === item.manhwa_id);
		if (!dataItem) {
			// connect again to database , reconnect and take necessery data
			let thatBook = await selectiveBookFetchToAdd(item);
			await addNewRecordsToDatabase(thatBook);
			console.log(`Added new book: ${item.title}`);
		} else if (item.chapter !== dataItem.chapter) {
			differencesInChapter.push(item);
		}
	});

	if (differencesInChapter.length == 0) {
		console.log("Theres not new any chapter");
	} else {
		console.log(differencesInChapter);
		await updateChapterNumber(differencesInChapter);
	}
}

export async function addNewRecordsToDatabase(filteredData) {
	return (
		database.manhwas
			.bulkPut(filteredData.map((item) => ({ ...item, srcimg: " " })))
			// .then(() => console.log("New books added"))
			.catch((error) => {
				console.error("Error while adding new records to database: ", error);
				throw error;
			})
	);
}
export async function updateChapterNumber(filteredData) {
	try {
		await Promise.all(
			filteredData.map(async (item) => {
				await database.manhwas.where("manhwa_id").equals(item.manhwa_id).modify({ chapter: item.chapter });
			})
		);
		console.log("New chapters updated");
	} catch (error) {
		console.error("Error while updating database: ", error);
		throw error;
	}
}

export async function selectiveBookFetchToAdd(newBook) {
	const id = newBook.manhwa_id;
	return axios
		.get(`http://localhost:3000/manhwas/methods/get/manhwa/${id}`)
		.then((res) => {
			const data = res.data;
			// console.log("Data downloaded from server");
			return data;
		})
		.catch((error) => {
			console.error("Error fetching data", error);
			throw error;
		});
}

export async function compareMetaData() {
	const metaDataArray = await database.metadata.toArray();
	const lastElement = new Date(metaDataArray[0].lastUpdate);
	const newDateToCompare = new Date();
	const timeDiffrence = newDateToCompare - lastElement;
	const hoursDiffrence = timeDiffrence / (1000 * 60 * 60); // add *60 to have hours
	console.log(`Last Update: ${lastElement}. New time to compare: ${newDateToCompare}. Diffrence in time:${hoursDiffrence} minutes. Diffrence time:${timeDiffrence}`);
	if (hoursDiffrence > 2) {
		console.log("Time for update");
		await compareDatabase();
		await database.metadata.where("i").equals(1).modify({ lastUpdate: newDateToCompare });
	} else {
		console.log("It is not time for update");
	}
}
