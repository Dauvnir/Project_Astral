import useAxiosPrivate from "./useAxiosPrivate";
import useGetUsername from "./useGetUsername";
import { database } from "../api/DatabaseLocal";

const useRemoveBook = () => {
	const username = useGetUsername();
	const axiosPrivate = useAxiosPrivate();
	const removeBook = async (manhwa_id) => {
		try {
			await axiosPrivate.post(
				"library/remove",
				{ username, manhwa_id },
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			await database
				.table("library")
				.where("manhwa_id")
				.equals(manhwa_id)
				.delete();
		} catch (error) {
			console.error("Error while deleting books: ", error);
		}
	};

	return removeBook;
};

export default useRemoveBook;
