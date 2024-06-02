import { database } from "../api/DatabaseLocal";

const useSortedData = () => {
	const pageSize = 30;
	const extractNumericPart = (chapter) => {
		const numericPart = chapter.match(/\d+/);
		return numericPart ? parseInt(numericPart[0], 10) : 0;
	};
	const fetchData = async (indexValue, sortMethod, inputValue) => {
		const startIndex = (indexValue - 1) * pageSize;
		let manhwasQuery = database.table("manhwas");

		if (sortMethod === "chapter19" || sortMethod === "chapter91") {
			manhwasQuery = await manhwasQuery
				.offset(startIndex)
				.limit(pageSize)
				.toArray();
			manhwasQuery.sort((a, b) => {
				const chapterA = extractNumericPart(a.chapter);
				const chapterB = extractNumericPart(b.chapter);
				return sortMethod === "chapter19"
					? chapterA - chapterB
					: chapterB - chapterA;
			});
		} else {
			switch (sortMethod) {
				case "nameAZ":
					manhwasQuery = await manhwasQuery
						.orderBy("title")
						.offset(startIndex)
						.limit(pageSize)
						.toArray();
					break;
				case "nameZA":
					manhwasQuery = await manhwasQuery
						.orderBy("title")
						.reverse()
						.offset(startIndex)
						.limit(pageSize)
						.toArray();
					break;
				case "scanlation":
					manhwasQuery = await manhwasQuery
						.orderBy("scanlation_site")
						.offset(startIndex)
						.limit(pageSize)
						.toArray();
					break;
				default:
					manhwasQuery = await manhwasQuery
						.offset(startIndex)
						.limit(pageSize)
						.toArray();
					break;
			}
		}
		if (inputValue) {
			sortMethod = "default";
			manhwasQuery = database.table("manhwas");

			manhwasQuery = await manhwasQuery
				.filter((manhwa) =>
					manhwa.title.toLowerCase().includes(inputValue.toLowerCase())
				)
				.offset(startIndex)
				.limit(pageSize)
				.toArray();
		}
		return manhwasQuery;
	};
	return fetchData;
};

export default useSortedData;
