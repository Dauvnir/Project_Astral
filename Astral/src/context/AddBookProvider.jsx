import { createContext, useState } from "react";

const AddBookContext = createContext();
// eslint-disable-next-line react/prop-types
export const AddBookProvider = ({ children }) => {
	const [bookID, setBookID] = useState(null);
	return (
		<AddBookContext.Provider value={{ bookID, setBookID }}>
			{children}
		</AddBookContext.Provider>
	);
};

export default AddBookContext;
