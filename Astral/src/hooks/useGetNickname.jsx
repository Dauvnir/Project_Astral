import { jwtDecode } from "jwt-decode";
import useAuth from "./useAuth";

const useGetNickname = () => {
	const { auth } = useAuth();
	try {
		const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
		const nickname = decoded?.UserInfo?.nickname;
		if (!nickname) {
			throw new Error("Nickname not found in token");
		}
		return nickname;
	} catch (error) {
		console.error("Error during retriving nickname");
	}
};

export default useGetNickname;
