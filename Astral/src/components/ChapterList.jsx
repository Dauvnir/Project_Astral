import styled from "styled-components";
import PropTypes from "prop-types";
import Chapter from "./Chapter";
import useSortedData from "../hooks/useSortedData";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { database } from "../api/DatabaseLocal";
import { BarLoader } from "react-spinners";
import { ScaleProvider } from "../context/ScaleProvider";

const Spinner = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 10rem;
	position: relative;
	padding: 1rem;
	z-index: 1;
`;
//  include to dependencies when adding sort function for input value
const ChapterList = ({
	sortMethod,
	inputValue,
	indexValue,
	scanlationSite,
}) => {
	const axiosPrivate = useAxiosPrivate();
	const [manhwa, setManhwa] = useState([]);
	const [loading, setLoading] = useState(false);
	const fetchData = useSortedData();

	const fetchImages = async (manhwas) => {
		await Promise.all(
			manhwas.map(async (manhwa) => {
				try {
					if (manhwa.srcimg === " ") {
						const response = await axiosPrivate.get(
							`/manhwas/methods/get/images/${manhwa.manhwa_id}`
						);
						const image = response.data[0];
						await database
							.table("manhwas")
							.where("manhwa_id")
							.equals(manhwa.manhwa_id)
							.modify({ srcimg: image.srcimg });
						manhwa.srcimg = image.srcimg; // Aktualizacja srcimg dla manhwy
					}
				} catch (error) {
					console.error("Error fetching images:", error);
					throw error; // Re-throw the error to be caught by the Promise.all catch block
				}
			})
		);
		return manhwas;
	};

	const fetchDataAndImages = async () => {
		setLoading(true);
		try {
			const manhwas = await fetchData(
				indexValue,
				sortMethod,
				inputValue,
				scanlationSite
			);
			const completeManhwa = await fetchImages(manhwas);
			setManhwa(completeManhwa);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchDataAndImages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [indexValue, sortMethod, inputValue]);
	return (
		<>
			{loading ? (
				<Spinner>
					<BarLoader height={5} width={400} color="#d9d9d9" />;
				</Spinner>
			) : (
				<ScaleProvider>
					{manhwa.map((manhwa, index) => (
						<Chapter
							key={index}
							manhwaID={manhwa.manhwa_id}
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
				</ScaleProvider>
			)}
		</>
	);
};
ChapterList.propTypes = {
	sortMethod: PropTypes.string.isRequired,
	inputValue: PropTypes.string,
	indexValue: PropTypes.number.isRequired,
	scanlationSite: PropTypes.string,
};
export default ChapterList;

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
