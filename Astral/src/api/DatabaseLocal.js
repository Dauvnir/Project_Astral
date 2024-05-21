import Dexie from "dexie";
import { axiosPrivate } from "./axios";

export const database = new Dexie("manhwa_list");
database.version(1).stores({
	manhwas:
		"++i, manhwa_id, srcimg, scanlation_site, title, websiteUrl, chapter", // Define your Dexie schema
});
database.version(2).stores({
	metadata: "i++, lastUpdate",
});

export function isDatabasePopulated() {
	return database.manhwas.count().then((countedValue) => countedValue > 0);
}

export async function populateDatabase(fetchedData) {
	const check = await database.manhwas.toArray();
	if (check.length === 0) {
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
	const controller = new AbortController();
	try {
		const response = await axiosPrivate.get("/manhwas/methods/get/manhwa", {
			signal: controller.signal,
		});
		const data = response.data;
		await database.metadata.put({ lastUpdate: new Date() });
		return await populateDatabase(data);
	} catch (error) {
		console.error("Error fetching data", error);
	}
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
//-----------------------------------------------------------------------------------------------------------------------------------------------------
export const connectToDatabase = async () => {
	try {
		await database.open();
		const isOpen = database.isOpen();
		if (isOpen) {
			console.log("Connected to user database");
		} else {
			console.log("Not connected to user database.");
		}
	} catch (error) {
		console.error("Error connecting to user database:", error);
		throw error;
	}
};

export async function fetchDataFromDatabase() {
	const controller = new AbortController();
	try {
		const response = await axiosPrivate.get("/manhwas/methods/get/manhwa", {
			signal: controller.signal,
		});
		const data = response.data;
		return data;
	} catch (error) {
		console.error("Error fetching data", error);
	}
}

export async function selectiveBookFetchToAdd(newBook) {
	const id = newBook.manhwa_id;
	const controller = new AbortController();
	try {
		const response = await axiosPrivate.get(
			`/manhwas/methods/get/manhwa/${id}`,
			{
				signal: controller.signal,
			}
		);
		const data = response.data;
		return data;
	} catch (error) {
		console.error(
			"Error while reconnecting to database to fetch src image",
			error
		);
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
				await database.manhwas
					.where("manhwa_id")
					.equals(item.manhwa_id)
					.modify({ chapter: item.chapter });
			})
		);
		console.log("New chapters updated");
	} catch (error) {
		console.error("Error while updating database: ", error);
		throw error;
	}
}

export async function compareDatabase() {
	await connectToDatabase();
	const indexedDbData = await database.manhwas.toArray();
	const dbData = await fetchDataFromDatabase();
	// console.log(dbData);

	if (indexedDbData.length === 0 || dbData.length === 0) {
		console.error("Indexed DB data or fetched data is empty.");
		return;
	}

	const differencesInChapter = [];

	dbData.forEach(async (item) => {
		const dataItem = indexedDbData.find(
			(dbDataItem) => dbDataItem.manhwa_id === item.manhwa_id
		);
		if (!dataItem) {
			// connect again to database , reconnect and take necessery data
			const thatBook = await selectiveBookFetchToAdd(item);
			await addNewRecordsToDatabase(thatBook);
			console.log(`Added new book: ${item.title}`);
		} else if (item.chapter !== dataItem.chapter) {
			differencesInChapter.push(item);
		}
	});

	if (differencesInChapter.length === 0) {
		console.log("There's not any  new chapter");
	} else {
		console.log(differencesInChapter);
		await updateChapterNumber(differencesInChapter);
	}
}

export async function compareMetaData() {
	const metaDataArray = await database.metadata.toArray();
	const lastElement = new Date(metaDataArray[0].lastUpdate);
	const newDateToCompare = new Date();
	const timeDiffrence = newDateToCompare - lastElement;
	const hoursDiffrence = timeDiffrence / (1000 * 60 * 60); // add *60 to have hours
	console.log(
		`Last Update: ${lastElement}. New time to compare: ${newDateToCompare}. Diffrence in time:${hoursDiffrence} minutes. Diffrence time:${timeDiffrence}`
	);
	if (hoursDiffrence > 2) {
		console.log("Time for update");
		await compareDatabase();
		await database.metadata
			.where("i")
			.equals(1)
			.modify({ lastUpdate: newDateToCompare });
	} else {
		console.log("It is not time for update");
	}
}
