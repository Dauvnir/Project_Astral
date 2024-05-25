import { jwtDecode } from "jwt-decode";
import useAuth from "./useAuth";
import { database } from "../api/DatabaseLocal";
import useAxiosPrivate from "./useAxiosPrivate";

async function checkLibraryExists(auth, axiosPrivate) {
	try {
		//If your local browser contain multiple users delete it all the time
		await database.library.clear();
		// Decode the JWT to get the username
		const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
		const username = decoded?.UserInfo?.username;
		if (!username) {
			throw new Error("Username not found in token");
		}
		// Make a GET request to check if the library exists for the username
		const response = await axiosPrivate.get(`/library?username=${username}`);
		const exists = response?.data?.exists;

		if (exists) {
			//then fetch database and put it to indexedDB
			const fetchLibraryResponse = await axiosPrivate.get(
				`/library/fetch?username=${username}`
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
}

//---Add books to database
export default async function useAddLibrary() {
	const axiosPrivate = useAxiosPrivate();
	const { auth } = useAuth();
	//import database if exists in sql database  , else do nothing user will add manually new books
	return await checkLibraryExists(auth, axiosPrivate);
}
