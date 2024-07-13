import { useContext } from "react";
import AddBookContext from "../context/AddBookProvider";

const useAddBookContext = () => {
	return useContext(AddBookContext);
};

export default useAddBookContext;
