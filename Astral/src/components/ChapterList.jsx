import styled from "styled-components";
import { database } from "../DatabaseLocal";
import Chapter from "./Chapter";
import { useLiveQuery } from "dexie-react-hooks";
import PacmanLoader from "react-spinners/PacmanLoader";
import PropTypes from "prop-types";
import { compareMetaData } from "../DatabaseLocal";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const StyledDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: left;
	width: 90vw;
	height: 15rem;
	padding: 1rem;
`;
// inputValue include to dependencies when adding sort function for input value
const ChapterList = ({ sortMethod, indexValue }) => {
	const pageSize = 50;
	const [startIndex, setStartIndex] = useState(0);
	const unmountTime = 60000;
	useEffect(() => {
		const interval = setInterval(async () => {
			await compareMetaData();
		}, unmountTime);

		return () => clearInterval(interval);
	}, []);
	useEffect(() => {
		setStartIndex((indexValue - 1) * pageSize);
	}, [indexValue]);

	let manhwasQuery;
	if (sortMethod === "nameAZ") {
		manhwasQuery = () =>
			database.table("manhwas").orderBy("title").offset(startIndex).limit(pageSize).toArray();
	} else if (sortMethod === "nameZA") {
		manhwasQuery = () =>
			database
				.table("manhwas")
				.orderBy("title")
				.reverse()
				.offset(startIndex)
				.limit(pageSize)
				.toArray();
	} else {
		manhwasQuery = () => database.table("manhwas").offset(startIndex).limit(pageSize).toArray();
	}

	const manhwas = useLiveQuery(manhwasQuery, [startIndex, pageSize, sortMethod]);

	if (manhwas) {
		manhwas.map(async (manhwa) => {
			if (manhwa.srcimg !== " ") {
				return;
			}
			try {
				await axios
					.get(`http://localhost:3000/manhwas/images/${manhwa.manhwa_id}`)
					.then((response) => {
						const image = response.data[0];
						return database
							.table("manhwas")
							.where("manhwa_id")
							.equals(manhwa.manhwa_id)
							.modify({ srcimg: image.srcimg });
					})
					.catch((error) => {
						console.error("Error fetching data", error);
						throw error;
					});
			} catch (error) {
				console.error("Error fetching images:", error);
			}
		});
	}

	return (
		<>
			{!manhwas ? (
				<StyledDiv>
					<PacmanLoader
						color="#d9d9d9"
						size={100}
						cssOverride={{
							opacity: 1,
						}}
					/>
				</StyledDiv>
			) : (
				manhwas.map((manhwa) => (
					<Chapter
						key={manhwa.manhwa_id}
						srcUrl={manhwa.websiteurl}
						imageUrl={manhwa.srcimg}
						chapterNumber={manhwa.chapter}
						title={manhwa.title}
					/>
				))
			)}
		</>
	);
};
ChapterList.propTypes = {
	sortMethod: PropTypes.string.isRequired,
	inputValue: PropTypes.string,
	indexValue: PropTypes.number.isRequired,
};
export default ChapterList;
