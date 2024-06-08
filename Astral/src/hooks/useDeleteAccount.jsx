import useAxiosPrivate from "./useAxiosPrivate";
import useGetNickname from "./useGetNickname";
import useLogout from "./useLogout";

const useDeleteAccount = () => {
	const axiosPrivate = useAxiosPrivate();
	const nickname = useGetNickname();
	const logout = useLogout();
	const DeleteAccount = async () => {
		await axiosPrivate.post(
			"/users/delete",
			{ nickname },
			{
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			}
		);
		await logout();
	};
	return DeleteAccount;
};

export default useDeleteAccount;
