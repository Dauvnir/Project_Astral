import Dexie from "dexie";
import axios from "axios";
export const database = new Dexie("manhwa_list");
database.version(1).stores({
	manhwas: "++i, manhwa_id, srcimg, scanlation_site, title, websiteUrl, chapter", // Define your Dexie schema
});

export function isDatabasePopulated() {
	return database.manhwas.count().then((countedValue) => countedValue > 0);
}

export function populateDatabase(fetchedData) {
	return database.manhwas
		.bulkPut(fetchedData)
		.then(() => {
			console.log("Database populated.");
		})
		.then(() => {
			database.close();
		})
		.catch((error) => {
			console.error("Error while populating database: ", error);
		});
}

export async function fetchDataAndPopulateDatabase() {
	const controller = new AbortController();
	return axios
		.get("http://localhost:3000/manhwas/images")
		.then((responseFromServer) => {
			const data = responseFromServer.data;
			return populateDatabase(data);
		})
		.then(() => {
			controller.abort();
		})
		.catch((error) => {
			console.error("Error fetching data", error);
		});
}

export function initializeDatabase() {
	return isDatabasePopulated().then((isPopulated) => {
		if (!isPopulated) {
			return fetchDataAndPopulateDatabase();
		} else {
			console.log("Database is already populated");
		}
	});
}
