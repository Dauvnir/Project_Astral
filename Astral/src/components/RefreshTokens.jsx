import { Outlet } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const RefreshTokens = () => {
	useAxiosPrivate();

	return <Outlet />;
};

export default RefreshTokens;
