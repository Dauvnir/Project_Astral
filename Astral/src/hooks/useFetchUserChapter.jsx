import { database } from "../api/DatabaseLocal";

const useFetchUserChapter = () => {
	const useFetchUserChapter = async (manhwa_id) => {
		const fetchedUserChapter = await database
			.table("library")
			.where("manhwa_id")
			.equals(manhwa_id)
			.toArray();
		const user_chapter = fetchedUserChapter[0].user_chapter;
		return user_chapter;
	};
	return useFetchUserChapter;
};

export default useFetchUserChapter;
