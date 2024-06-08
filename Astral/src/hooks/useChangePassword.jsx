import useAxiosPrivate from "./useAxiosPrivate";
import useGetNickname from "./useGetNickname";

const useChangePassword = () => {
	const nickname = useGetNickname();
	const axiosPrivate = useAxiosPrivate();
	const ChangePassword = async (password) => {
		try {
			await axiosPrivate.post(
				"/users/update/password",
				{ nickname, password },
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
		} catch (error) {
			console.error("Error while changing password", error);
		}
	};
	return ChangePassword;
};

export default useChangePassword;
