import { database } from "../api/DatabaseLocal";
import useAxiosPrivate from "./useAxiosPrivate";
import useGetNickname from "./useGetNickname";

//---Add books to database
const useAddLibrary = () => {
	const axiosPrivate = useAxiosPrivate();
	const nickname = useGetNickname();
	const checkLibraryExists = async () => {
		try {
			//If your local browser contain multiple users delete it all the time
			await database.library.clear();

			const response = await axiosPrivate.post(
				"/library",
				{ nickname },
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			const exists = response?.data?.exists;
			if (exists) {
				//then fetch database and put it to indexedDB
				const fetchLibraryResponse = await axiosPrivate.post(
					"/library/fetch",
					{ nickname },
					{
						headers: { "Content-Type": "application/json" },
						withCredentials: true,
					}
				);
				const library = fetchLibraryResponse?.data?.library;
				if (library && library.length > 0) {
					await database.library.bulkPut(library);
				} else {
					console.error("Library is not defined or empty");
				}
			}
		} catch (error) {
			console.error("Error checking library:", error);
		}
	};
	return checkLibraryExists();
};

export default useAddLibrary;