import { database } from "../api/DatabaseLocal";
import useAxiosPrivate from "./useAxiosPrivate";
import useGetUsername from "./useGetUsername";

const useToggleFavourite = () => {
	const axiosPrivate = useAxiosPrivate();
	const username = useGetUsername();
	const toggleFavourite = async (manhwa_id, favoriteStatus) => {
		try {
			await database
				.table("library")
				.where("manhwa_id")
				.equals(manhwa_id)
				.modify({ is_favourite: `${!favoriteStatus}` });

			await axiosPrivate.post(
				"library/favourite",
				{ username, manhwa_id, favoriteStatus },
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
		} catch (error) {
			console.error("Error while adding to favorite", error);
		}
	};

	return toggleFavourite;
};

export default useToggleFavourite;
