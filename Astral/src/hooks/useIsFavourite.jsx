import { database } from "../api/DatabaseLocal";

const useIsFavourite = () => {
	const isFavourite = async (manhwa_id) => {
		try {
			const favourite = await database
				.table("library")
				.where("manhwa_id")
				.equals(manhwa_id)
				.first();
			return favourite?.is_favourite;
		} catch (error) {
			console.error("Error fetching favourite status:", error);
			return false;
		}
	};

	return isFavourite;
};

export default useIsFavourite;
