import styled from "styled-components";
import { database } from "../api/DatabaseLocal";
import { useLiveQuery } from "dexie-react-hooks";
import PacmanLoader from "react-spinners/PacmanLoader";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Suspense, lazy } from "react";
const StyledDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: left;
	width: 90vw;
	height: 15rem;
	padding: 1rem;
`;
const Chapter = lazy(() => import("./Chapter"));

//  include to dependencies when adding sort function for input value
const ChapterList = ({ sortMethod, inputValue, indexValue }) => {
	const axiosPrivate = useAxiosPrivate();
	const pageSize = 50;
	const [startIndex, setStartIndex] = useState(0);

	useEffect(() => {
		setStartIndex((indexValue - 1) * pageSize);
	}, [indexValue]);

	let manhwasQuery;
	if (sortMethod === "nameAZ") {
		manhwasQuery = () =>
			database
				.table("manhwas")
				.orderBy("title")
				.offset(startIndex)
				.limit(pageSize)
				.toArray();
	} else if (sortMethod === "nameZA") {
		manhwasQuery = () =>
			database
				.table("manhwas")
				.orderBy("title")
				.reverse()
				.offset(startIndex)
				.limit(pageSize)
				.toArray();
	} else if (sortMethod === "scanlation") {
		manhwasQuery = () =>
			database
				.table("manhwas")
				.orderBy("scanlation_site")
				.offset(startIndex)
				.limit(pageSize)
				.toArray();
	} else if (sortMethod === "chapter19") {
		manhwasQuery = async () => {
			let manhwas = await database.table("manhwas").toArray();

			manhwas.sort((a, b) => {
				const chapterA = extractNumericPart(a.chapter);
				const chapterB = extractNumericPart(b.chapter);
				return chapterA - chapterB;
			});

			manhwas = manhwas.slice(startIndex, startIndex + pageSize);

			return manhwas;
		};
	} else if (sortMethod === "chapter91") {
		manhwasQuery = async () => {
			let manhwas = await database.table("manhwas").toArray();

			manhwas.sort((a, b) => {
				const chapterA = extractNumericPart(a.chapter);
				const chapterB = extractNumericPart(b.chapter);
				return chapterB - chapterA;
			});

			manhwas = manhwas.slice(startIndex, startIndex + pageSize);

			return manhwas;
		};
	} else {
		if (inputValue) {
			manhwasQuery = () =>
				database
					.table("manhwas")
					.toArray()
					.then((manhwas) =>
						manhwas.filter((manhwa) =>
							manhwa.title
								.toLowerCase()
								.match(new RegExp(inputValue.toLowerCase(), "g"))
						)
					);
		} else {
			manhwasQuery = () =>
				database.table("manhwas").offset(startIndex).limit(pageSize).toArray();
		}
	}

	const manhwas = useLiveQuery(manhwasQuery, [
		startIndex,
		pageSize,
		sortMethod,
		inputValue,
	]);

	function extractNumericPart(chapter) {
		const match = chapter.match(/\d+/);
		return match ? parseInt(match[0]) : Infinity;
	}

	if (manhwas) {
		manhwas.map(async (manhwa) => {
			try {
				if (manhwa.srcimg !== " ") {
					return;
				} else {
					const response = await axiosPrivate.get(
						`/manhwas/methods/get/images/${manhwa.manhwa_id}`
					);
					const image = response.data[0];
					return database
						.table("manhwas")
						.where("manhwa_id")
						.equals(manhwa.manhwa_id)
						.modify({ srcimg: image.srcimg });
				}
			} catch (error) {
				console.error("Error fetching images:", error);
			}
		});
	}

	// const uniqueScanlationSites = new Set();

	// manhwas.forEach((manhwa) => {
	// 	if (
	// 		manhwa.scanlation_site &&
	// 		!uniqueScanlationSites.has(manhwa.scanlation_site)
	// 	) {
	// 		uniqueScanlationSites.add(manhwa.scanlation_site);
	// 	}
	// });
	// {uniqueScanlationSites.has(manhwa.scanlation_site) &&
	// 	sortMethod == "scanlation" && (
	// 		<>
	// 			<span>{manhwa.scanlation_site}</span>
	// 			{uniqueScanlationSites.delete(manhwa.scanlation_site)}
	// 		</>
	// 	)}

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
				<Suspense fallback={<div>Loading chapters...</div>}>
					{manhwas.map((manhwa) => (
						<Chapter
							key={manhwa.manhwa_id}
							srcUrl={manhwa.websiteurl}
							imageUrl={manhwa.srcimg}
							scanlation={manhwa.scanlation_site}
							chapterNumber={
								manhwa.chapter.length >= 11
									? manhwa.chapter.slice(0, 11).replace(/\s+$/, "")
									: manhwa.chapter
							}
							title={
								manhwa.title.length >= 45
									? manhwa.title.slice(0, 45).replace(/\s+$/, "") + "..."
									: manhwa.title
							}
						/>
					))}
				</Suspense>
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
