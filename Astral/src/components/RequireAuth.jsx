import { useLocation, Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
	const { auth } = useAuth();
	const location = useLocation();
	console.log(JSON.stringify(auth.roles));
	return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
		<Outlet />
	) : auth?.accessToken ? (
		<Navigate to="/unauthorized" state={{ from: location }} replace />
	) : (
		<Navigate to="/form/login" state={{ from: location }} replace />
	);
};

RequireAuth.propTypes = {
	allowedRoles: PropTypes.array,
};
export default RequireAuth;
