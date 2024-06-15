import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useEffect } from "react";
import { database } from "../api/DatabaseLocal";

const useGetLeaderboard = () => {
	const [leaderboard, setLeaderboard] = useState([]);
	const axiosPrivate = useAxiosPrivate();
	const getLeaderboard = async () => {
		try {
			const response = await axiosPrivate.get("/leaderboard", {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			});
			const data = response.data;
			return data.leaderboard;
		} catch (error) {
			console.error("Error fetching leaderboard:", error);
			throw error;
		}
	};

	const completeLeaderboard = async () => {
		try {
			const dataObject = await getLeaderboard();
			const manhwaIds = dataObject.map((item) => item.manhwa_id);

			manhwaIds.forEach(async (book) => {
				if (book.srcimg === "") {
					try {
						const response = await axiosPrivate.get(
							`/manhwa/methods/get/images/${book.manhwa_id}`
						);

						const image = response.data;

						await database
							.table("manhwas")
							.where("manhwa_id")
							.equals(book.manhwa_id)
							.modify({ srcimg: image });
					} catch (error) {
						console.error("Error while fetching images", error);
					}
				}
			});

			const books = await database
				.table("manhwas")
				.where("manhwa_id")
				.anyOf(manhwaIds)
				.toArray();

			const combinedData = books.map((book) => {
				const match = dataObject.find(
					(item) => item.manhwa_id === book.manhwa_id
				);
				return {
					...book,
					favorite_count: match ? match.favorite_count : 0,
				};
			});

			setLeaderboard(combinedData);
		} catch (error) {
			console.error("Error completing leaderboard:", error);
		}
	};

	useEffect(() => {
		completeLeaderboard();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { leaderboard };
};

export default useGetLeaderboard;
