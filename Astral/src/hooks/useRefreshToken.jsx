import axios from "../api/axios";
import useAuth from "./useAuth";
import { jwtDecode } from "jwt-decode";

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		const response = await axios.get("/refresh", { withCredentials: true });

		const decoded = response?.data?.accessToken
			? jwtDecode(response.data.accessToken)
			: undefined;
		const roles = decoded?.UserInfo?.roles || [];
		setAuth((prev) => {
			return {
				...prev,
				roles: roles,
				accessToken: response.data.accessToken,
			};
		});
		return response.data.accessToken;
	};

	return refresh;
};

export default useRefreshToken;
