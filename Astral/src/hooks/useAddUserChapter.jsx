import { database } from "../api/DatabaseLocal";
import useAxiosPrivate from "./useAxiosPrivate";
import useGetNickname from "./useGetNickname";

const useAddUserChapter = () => {
	const nickname = useGetNickname();
	const axiosPrivate = useAxiosPrivate();

	const AddUserChapter = async (manhwa_id, user_chapter) => {
		try {
			await database
				.table("library")
				.where("manhwa_id")
				.equals(manhwa_id)
				.modify({ user_chapter: user_chapter });

			await axiosPrivate.post(
				"/library/chapter",
				{ nickname, manhwa_id, user_chapter },
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
		} catch (error) {
			console.error(
				"Error while adding personal user chapter to database",
				error
			);
		}
	};

	return AddUserChapter;
};

export default useAddUserChapter;
