import useAuth from "./useAuth";
import { database } from "../api/DatabaseLocal";
import { jwtDecode } from "jwt-decode";
import useAxiosPrivate from "./useAxiosPrivate";
import { useCallback } from "react";
const useAddBook = () => {
	const { auth } = useAuth();
	const axiosPrivate = useAxiosPrivate();
	const addBook = useCallback(
		async (manhwa_id, user_chapter) => {
			try {
				if (!manhwa_id || !user_chapter) {
					throw new Error("Manhwa ID and chapter must be provided");
				}
				const decoded = auth?.accessToken
					? jwtDecode(auth.accessToken)
					: undefined;
				const username = decoded?.UserInfo?.username;
				if (!username) {
					throw new Error("Username not found in token");
				}
				await database.library.add({ manhwa_id, user_chapter });

				await axiosPrivate.post(
					"/library/add",
					{ username, manhwa_id, user_chapter },
					{
						headers: { "Content-Type": "application/json" },
						withCredentials: true,
					}
				);
			} catch (error) {
				console.error("Error while adding books to the database:", error);
			}
		},
		[auth, axiosPrivate]
	);
	return addBook;
};

export default useAddBook;
