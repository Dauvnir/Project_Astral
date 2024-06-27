import { useContext } from "react";
import ScaleContext from "../context/ScaleProvider";

const useScale = () => {
	return useContext(ScaleContext);
};

export default useScale;
