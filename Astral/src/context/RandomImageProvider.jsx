import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useRandomPick from "../hooks/useRandomPick";

const ImageContext = createContext();
// eslint-disable-next-line react/prop-types
export const RandomImageProvider = ({ children }) => {
	const [imageArray, setImageArray] = useState([]);
	const images = useRandomPick();
	useEffect(() => {
		const imagesHandler = async () => {
			try {
				const data = await images();
				setImageArray(data);
			} catch (error) {
				console.error("Error while adding images to RANDOM PICK", error);
			}
		};
		imagesHandler();
	}, []);
	return (
		<ImageContext.Provider value={{ imageArray }}>
			<Outlet>{children}</Outlet>
		</ImageContext.Provider>
	);
};

export default ImageContext;
