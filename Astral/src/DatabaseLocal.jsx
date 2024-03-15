import Dexie from "dexie";
import axios from "axios";

const DatabaseLocal = async () => {
	const database = new Dexie("manhwa_list");
	database.version(1).stores({
		manhwas: "++i, manhwa_id, srcimg", // Define your Dexie schema
	});
	try {
		const response = await axios.get("http://localhost:3000/manhwas/images");
		const imagesArray = response.data;
		console.log(response.data);
		await database.manhwas.bulkPut(imagesArray);
	} catch (error) {
		console.error("Error fetching data", error);
	}
};

export default DatabaseLocal;
