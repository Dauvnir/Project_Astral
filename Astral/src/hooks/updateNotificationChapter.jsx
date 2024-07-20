import { database } from "../api/DatabaseLocal";

export default async function updateNotificationChapter() {
	try {
		const fetchLibraryChapters = async () => {
			return await database.table("library").toArray();
		};

		const userDatabase = await fetchLibraryChapters();

		const manhwaID = new Set(
			userDatabase.map((manhwa) => {
				return manhwa.manhwa_id;
			})
		);

		const array = [...manhwaID];
		const keys = ["i", "scanlation_site", "websiteurl"];
		const fetchMainDatabase = async (userDatabase) => {
			const mainDatabase = await database
				.table("manhwas")
				.filter((manhwa) => userDatabase.includes(manhwa.manhwa_id))
				.toArray();

			return mainDatabase;
		};

		const combinedData = await fetchMainDatabase(array);

		combinedData.forEach((manhwa) => {
			keys.forEach((key) => {
				delete manhwa[key];
			});
		});

		return combinedData;
	} catch (error) {
		console.error("Error while fetching database from INDEXEDDB");
		throw error;
	}
}
