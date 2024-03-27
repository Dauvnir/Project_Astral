import styled from "styled-components";
import { database } from "../DatabaseLocal";
import Chapter from "./Chapter";
import { useLiveQuery } from "dexie-react-hooks";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useEffect } from "react";
import PropTypes from "prop-types";

const StyledDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: left;
	width: 90vw;
	height: 15rem;
	padding: 1rem;
`;

const ChapterList = ({ sortMethod, inputValue }) => {
	useEffect(() => {
		const handleLoad = async () => {
			await database.open();
		};
		handleLoad();
	}, []);

	const fetchData = async () => {
		await database.open();
		const isOpen = database.isOpen();
		if (isOpen) {
			const data = await database.manhwas.toArray();
			return data;
		} else {
			console.log("Brak polaczenia");
			return null;
		}
	};

	const fetchDataAndClose = async () => {
		const data = await fetchData();
		database.close();
		return data;
	};

	const manhwasAll = useLiveQuery(fetchDataAndClose);

	let renderedChapters = null;
	if (!manhwasAll) {
		renderedChapters = (
			<StyledDiv>
				<PacmanLoader
					color="#d9d9d9"
					size={100}
					cssOverride={{
						opacity: 1,
					}}
				/>
			</StyledDiv>
		);
	} else {
		let sortedManhwas = manhwasAll;
		if (sortMethod === "nameAZ") {
			sortedManhwas = manhwasAll.slice().sort((a, b) => a.title.localeCompare(b.title));
		}
		if (sortMethod === "nameZA") {
			sortedManhwas = manhwasAll.slice().sort((a, b) => b.title.localeCompare(a.title));
		}
		if (sortMethod === "scanlation") {
			sortedManhwas = manhwasAll;
			sortedManhwas = manhwasAll
				.slice()
				.sort((a, b) => a.scanlation_site.localeCompare(b.scanlation_site));
		}
		if (sortMethod === "chapter19") {
			sortedManhwas = manhwasAll;
			sortedManhwas = manhwasAll
				.slice()
				.sort((a, b) => a.chapter.localeCompare(b.chapter, undefined, { numeric: true }));
		}
		if (sortMethod === "chapter91") {
			sortedManhwas = manhwasAll;
			sortedManhwas = manhwasAll
				.slice()
				.sort((a, b) => b.chapter.localeCompare(a.chapter, undefined, { numeric: true }));
		}

		let filteredManhwas = sortedManhwas;

		if (inputValue == "") {
			filteredManhwas = sortedManhwas;
		} else {
			filteredManhwas = sortedManhwas.filter((manhwa) =>
				manhwa.title.toLowerCase().includes(inputValue.toLowerCase())
			);
		}
		renderedChapters = filteredManhwas.map((manhwa) => (
			<Chapter
				key={manhwa.manhwa_id}
				srcUrl={manhwa.websiteurl}
				imageUrl={manhwa.srcimg}
				chapterNumber={manhwa.chapter}
				title={manhwa.title}
			/>
		));
	}
	return <>{renderedChapters}</>;
};

ChapterList.propTypes = {
	sortMethod: PropTypes.string.isRequired,
	inputValue: PropTypes.string,
};
export default ChapterList;
