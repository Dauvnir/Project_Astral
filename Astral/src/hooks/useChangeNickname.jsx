import useAxiosPrivate from "./useAxiosPrivate";
import useGetNickname from "./useGetNickname";

const useChangeNickname = () => {
	const nickname = useGetNickname();
	const axiosPrivate = useAxiosPrivate();
	const changeNickname = async (new_nickname) => {
		try {
			await axiosPrivate.post(
				"/users/update/nickname",
				{ nickname, new_nickname },
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
		} catch (error) {
			console.error("Error while updating nickname", error);
		}
	};
	return changeNickname;
};

export default useChangeNickname;
