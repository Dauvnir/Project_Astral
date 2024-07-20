import { useContext } from "react";
import ImageContext from "../context/RandomImageProvider";

const useRandomImage = () => {
	return useContext(ImageContext);
};

export default useRandomImage;
