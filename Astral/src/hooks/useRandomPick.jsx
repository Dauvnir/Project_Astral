import { database } from "../api/DatabaseLocal";
import useAxiosPrivate from "./useAxiosPrivate";

const useRandomPick = () => {
	const axiosPrivate = useAxiosPrivate();

	function generateRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	let images = [];

	const randomPick = async () => {
		let uniqueNumbers = new Set();
		try {
			const base = await database.table("manhwas").toArray();
			const length = base.length;

			while (uniqueNumbers.size < 20) {
				uniqueNumbers.add(generateRandomNumber(0, length - 1));
			}

			const array = Array.from(uniqueNumbers);

			images = await database
				.table("manhwas")
				.where("manhwa_id")
				.anyOf(array)
				.toArray();

			await Promise.all(
				images.map(async (image) => {
					if (image.srcimg === "") {
						try {
							const response = await axiosPrivate.get(
								`/manhwa/methods/get/images/${image.manhwa_id}`
							);

							const data = response.data;

							await database
								.table("manhwas")
								.where("manhwa_id")
								.equals(image.manhwa_id)
								.modify({ srcimg: data });
						} catch (error) {
							console.error("Error while fetching images", error);
						}
					}
				})
			);

			images = await database
				.table("manhwas")
				.where("manhwa_id")
				.anyOf(array)
				.toArray();

			return images;
		} catch (error) {
			console.error("Error while fetching local database:", error);
		}
	};

	return randomPick;
};

export default useRandomPick;
