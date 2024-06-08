import { database } from "../api/DatabaseLocal";
import useAxiosPrivate from "./useAxiosPrivate";
import useGetNickname from "./useGetNickname";

const useToggleFavourite = () => {
	const axiosPrivate = useAxiosPrivate();
	const nickname = useGetNickname();
	const toggleFavourite = async (manhwa_id, favoriteStatus) => {
		let favourite = !favoriteStatus;
		try {
			await database
				.table("library")
				.where("manhwa_id")
				.equals(manhwa_id)
				.modify({ is_favourite: favourite });

			await axiosPrivate.post(
				"library/favourite",
				{ nickname, manhwa_id, favourite },
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
