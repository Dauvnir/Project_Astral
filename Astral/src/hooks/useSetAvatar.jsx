import useAxiosPrivate from "./useAxiosPrivate";
import useGetNickname from "./useGetNickname";

const useSetAvatar = () => {
	const axiosPrivate = useAxiosPrivate();
	const nickname = useGetNickname();
	const setAvatar = async (avatar) => {
		try {
			await axiosPrivate.post(
				"/users/avatar",
				{ nickname, avatar },
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
		} catch (error) {
			console.error("Error while sending to server name of avatar.", error);
		}
	};

	return setAvatar;
};

export default useSetAvatar;
