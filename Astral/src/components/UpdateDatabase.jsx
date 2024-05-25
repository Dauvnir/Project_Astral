import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { compareMetaData } from "../api/DatabaseLocal";
import { useEffect } from "react";

const UpdateDatabase = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const unmountTime = 60000;
	useEffect(() => {
		const interval = setInterval(async () => {
			try {
				await compareMetaData();
			} catch (error) {
				console.error(error);
				navigate("/form/login", { state: { from: location }, replace: true });
			}
		}, unmountTime);

		return () => clearInterval(interval);
	}, [location, navigate]);

	return <Outlet></Outlet>;
};

export default UpdateDatabase;
