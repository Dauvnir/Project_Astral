import { PacmanLoader } from "react-spinners";
import useFetchDataFromIDB from "../hooks/useFetchDataFromIDB";
import Chapter from "./Chapter";

let keyCounter = 0;

const ChapterListForLibrary = () => {
	const fetchedData = useFetchDataFromIDB();
	console.log(fetchedData);
	return (
		<>
			{fetchedData === undefined || fetchedData.length === 0 ? (
				<PacmanLoader
					color="#d9d9d9"
					size={100}
					cssOverride={{
						opacity: 1,
					}}
				/>
			) : (
				<>
					{fetchedData.map((book) => (
						<Chapter
							key={keyCounter++} //change it to manhwa_id later
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
					))}
				</>
			)}
		</>
	);
};
export default ChapterListForLibrary;
