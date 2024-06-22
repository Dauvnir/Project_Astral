import { useState, useEffect } from "react";
import { database } from "../api/DatabaseLocal";

const useFetchSites = () => {
	const [uniqueSites, setUniqueSites] = useState([]);

	useEffect(() => {
		const fetchSites = async () => {
			const uniqueSitesSet = new Set();
			await database.table("manhwas").each((element) => {
				uniqueSitesSet.add(element.scanlation_site);
			});
			const uniqueSitesArray = Array.from(uniqueSitesSet);
			setUniqueSites(uniqueSitesArray);
		};

		fetchSites();
	}, []);
	return uniqueSites;
};

export default useFetchSites;
