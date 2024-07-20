import useAxiosPrivate from "./useAxiosPrivate";
import useGetNickname from "./useGetNickname";

const useChangeEmail = () => {
	const axiosPrivate = useAxiosPrivate();
	const nickname = useGetNickname();

	const changeEmail = async (email) => {
		try {
			await axiosPrivate.post(
				"/users/update/email",
				{ nickname, email },
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
		} catch (error) {
			console.error("Error while changing e-mail:", error);
		}
	};

	return changeEmail;
};

export default useChangeEmail;
