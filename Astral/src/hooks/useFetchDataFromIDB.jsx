import { useLiveQuery } from "dexie-react-hooks";
import { database } from "../api/DatabaseLocal";

const useFetchDataFromIDB = () => {
	const manhwas = async () => {
		try {
			const books = await database.table("library").toArray();
			const manhwaPromises = books.map((book) =>
				database
					.table("manhwas")
					.where("manhwa_id")
					.equals(book.manhwa_id)
					.toArray()
			);
			const results = await Promise.all(manhwaPromises);
			return results.flat();
		} catch (error) {
			console.error("Error while fetching", error);
		}
	};
	const liveQuery = useLiveQuery(manhwas);
	return liveQuery;
};

export default useFetchDataFromIDB;
