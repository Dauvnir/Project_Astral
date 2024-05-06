import { Outlet } from "react-router-dom";
const Layout = () => {
	return (
		<main style={{ width: "100%", height: "100%" }}>
			<Outlet />
		</main>
	);
};

export default Layout;
