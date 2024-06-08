import { database } from "../api/DatabaseLocal";
import useAxiosPrivate from "./useAxiosPrivate";
import { useCallback } from "react";
import useGetNickname from "./useGetNickname";

const useAddBook = () => {
	const axiosPrivate = useAxiosPrivate();
	const nickname = useGetNickname();
	const addBook = useCallback(
		async (manhwa_id, user_chapter) => {
			const is_favourite = false;
			try {
				if (!manhwa_id || !user_chapter) {
					throw new Error("Manhwa ID and chapter must be provided");
				}
				await database.library.add({ manhwa_id, user_chapter, is_favourite });

				await axiosPrivate.post(
					"/library/add",
					{ nickname, manhwa_id, user_chapter },
					{
						headers: { "Content-Type": "application/json" },
						withCredentials: true,
					}
				);
			} catch (error) {
				console.error("Error while adding books to the database:", error);
			}
		},
		[axiosPrivate, nickname]
	);
	return addBook;
};

export default useAddBook;
