import useAxiosPrivate from "./useAxiosPrivate";
import useGetNickname from "./useGetNickname";
import useRefreshToken from "./useRefreshToken";

const useChangeNickname = () => {
	const nickname = useGetNickname();
	const axiosPrivate = useAxiosPrivate();
	const refresh = useRefreshToken();
	const changeNickname = async (new_nickname) => {
		await axiosPrivate.post(
			"/users/update/nickname",
			{ nickname, new_nickname },
			{
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			}
		);
		await refresh();
	};
	return changeNickname;
};

export default useChangeNickname;
