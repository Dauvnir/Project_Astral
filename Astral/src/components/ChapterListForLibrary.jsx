import { PacmanLoader } from "react-spinners";
import useFetchDataFromIDB from "../hooks/useFetchDataFromIDB";
import ChapterForLibrary from "./ChapterForLibrary";
import PropTypes from "prop-types";
import { useLiveQuery } from "dexie-react-hooks";

const ChapterListForLibrary = ({ isEditable }) => {
	let keyCounter = 0;
	const fetchedData = useFetchDataFromIDB();

	const liveQuery = useLiveQuery(fetchedData);

	if (liveQuery === undefined) {
		return (
			<PacmanLoader
				color="#d9d9d9"
				size={100}
				cssOverride={{
					opacity: 1,
				}}
			/>
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
				<div>No Manhwas Found</div>
			)}
		</>
	);
};
ChapterListForLibrary.propTypes = {
	isEditable: PropTypes.bool.isRequired,
};

export default ChapterListForLibrary;
