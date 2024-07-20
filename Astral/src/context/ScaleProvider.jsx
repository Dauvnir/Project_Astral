import { createContext, useState } from "react";

const ScaleContext = createContext();
// eslint-disable-next-line react/prop-types
export const ScaleProvider = ({ children }) => {
	const [scaledId, setScaledId] = useState(null);
	return (
		<ScaleContext.Provider value={{ scaledId, setScaledId }}>
			{children}
		</ScaleContext.Provider>
	);
};

export default ScaleContext;
