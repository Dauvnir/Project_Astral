import { Outlet } from "react-router-dom";
import useAddLibrary from "../hooks/useAddLibrary";

const AddLibrary = () => {
	useAddLibrary();
	return <Outlet />;
};

export default AddLibrary;
