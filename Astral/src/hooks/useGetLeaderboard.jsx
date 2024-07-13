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
			await Promise.all(
				manhwaIds.map(async (manhwaId) => {
					try {
						const response = await axiosPrivate.get(
							`/manhwas/methods/get/images/${manhwaId}`
						);
						const data = response.data;
						const flattenedSrcimgs = data.map((element) => element.srcimg);
						await database
							.table("manhwas")
							.where("manhwa_id")
							.equals(manhwaId)
							.modify({ srcimg: flattenedSrcimgs });
					} catch (error) {
						console.error("Error while fetching images", error);
					}
				})
			);

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
