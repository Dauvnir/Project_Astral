import useAxiosPrivate from "./useAxiosPrivate";
import useGetNickname from "./useGetNickname";

const useChangeNickname = () => {
	const nickname = useGetNickname();
	const axiosPrivate = useAxiosPrivate();
	const changeNickname = async (new_nickname) => {
		await axiosPrivate.post(
			"/users/update/nickname",
			{ nickname, new_nickname },
			{
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			}
		);
	};
	return changeNickname;
};

export default useChangeNickname;
