import { database } from "../api/DatabaseLocal";
import useAxiosPrivate from "./useAxiosPrivate";

const useFetchDataFromIDB = () => {
	const axiosPrivate = useAxiosPrivate();
	const liveQuery = async () => {
		try {
			const books = await database.table("library").toArray();
			const manhwaIds = books.map((book) => book.manhwa_id);
			const manhwas = await database
				.table("manhwas")
				.filter((manhwa) => manhwaIds.includes(manhwa.manhwa_id))
				.toArray();
			await Promise.all(
				manhwas.map(async (manhwa) => {
					try {
						if (manhwa.srcimg === " ") {
							const response = await axiosPrivate.get(
								`/manhwas/methods/get/images/${manhwa.manhwa_id}`
							);
							const image = response.data[0];
							await database
								.table("manhwas")
								.where("manhwa_id")
								.equals(manhwa.manhwa_id)
								.modify({ srcimg: image.srcimg });
							manhwa.srcimg = image.srcimg; // Aktualizacja srcimg dla manhwy
						}
					} catch (error) {
						console.error("Error fetching images:", error);
						throw error; // Re-throw the error to be caught by the Promise.all catch block
					}
				})
			);
			return manhwas.filter((manhwa) => manhwa !== undefined);
		} catch (error) {
			console.error("Error while fetching", error);
			return [];
		}
	};
	return liveQuery;
};

export default useFetchDataFromIDB;
