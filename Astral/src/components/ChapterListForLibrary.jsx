import { BarLoader } from "react-spinners";
import useFetchDataFromIDB from "../hooks/useFetchDataFromIDB";
import ChapterForLibrary from "./ChapterForLibrary";
import PropTypes from "prop-types";
import { useLiveQuery } from "dexie-react-hooks";
import styled from "styled-components";

const Spinner = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 10rem;
	position: relative;
	z-index: 1;
`;
const ChapterListForLibrary = ({ isEditable }) => {
	let keyCounter = 0;
	const fetchedData = useFetchDataFromIDB();

	const liveQuery = useLiveQuery(fetchedData);

	if (liveQuery === undefined) {
		return (
			<Spinner>
				<BarLoader height={5} width={400} color="#d9d9d9" />;
			</Spinner>
		);
	}
	return (
		<>
			{liveQuery.length > 0 ? (
				liveQuery.map((book) => (
					<ChapterForLibrary
						isEditable={isEditable}
						key={keyCounter++} //change it to manhwa_id later
						manhwaID={book.manhwa_id}
						srcUrl={book.websiteurl}
						imageUrl={book.srcimg}
						scanlation={book.scanlation_site}
						chapterNumber={
							book.chapter.length >= 11
								? book.chapter.slice(0, 11).replace(/\s+$/, "")
								: book.chapter
						}
						title={
							book.title.length >= 45
								? book.title.slice(0, 45).replace(/\s+$/, "") + "..."
								: book.title
						}
					/>
				))
			) : (
				<div>manhwa not found</div>
			)}
		</>
	);
};
ChapterListForLibrary.propTypes = {
	isEditable: PropTypes.bool.isRequired,
};

export default ChapterListForLibrary;
