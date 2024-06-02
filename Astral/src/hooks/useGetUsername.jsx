import { jwtDecode } from "jwt-decode";
import useAuth from "./useAuth";

const useGetUsername = () => {
	const { auth } = useAuth();
	try {
		const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
		const username = decoded?.UserInfo?.username;
		if (!username) {
			throw new Error("Username not found in token");
		}
		return username;
	} catch (error) {
		console.error("Error during retriving username");
	}
};

export default useGetUsername;
