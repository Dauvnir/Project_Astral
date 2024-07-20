import { database } from "../api/DatabaseLocal";

const useFetchUserChapter = () => {
	const justFetchIt = async (manhwa_id) => {
		const fetchedUserChapter = await database
			.table("library")
			.where("manhwa_id")
			.equals(manhwa_id)
			.toArray();

		const userChapter = fetchedUserChapter[0].user_chapter;

		return userChapter;
	};
	return justFetchIt;
};

export default useFetchUserChapter;
