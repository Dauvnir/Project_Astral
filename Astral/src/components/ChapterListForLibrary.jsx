import { BarLoader } from "react-spinners";
import useFetchDataFromIDB from "../hooks/useFetchDataFromIDB";
import ChapterForLibrary from "./ChapterForLibrary";
import PropTypes from "prop-types";
import { useLiveQuery } from "dexie-react-hooks";
import styled from "styled-components";
import { AddBookProvider } from "../context/AddBookProvider";
import { Paragraph } from "./Paragraph";

const Spinner = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: calc(100vw - 3rem);
	height: 10rem;
	position: relative;
	z-index: 1;
	@media (max-width: 450px) {
		width: calc(100vw + 1rem);
		transform: scale(0.8);
		margin-left: -2rem;
	}
`;
const DivWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: calc(100vw - 2rem);
	text-align: left;
	height: 10rem;
	padding: 1rem;
	text-align: center;
	gap: 1.5rem;
`;
const Text = styled(Paragraph)`
	font-size: 1.25rem;
	width: 100%;
`;
const Header = styled.h2`
	color: #d9d9d9;
	font-family: Lato;
	font-style: normal;
	line-height: normal;
	font-weight: 600;
`;
const ChapterListForLibrary = ({ isEditable, isFavourite }) => {
	const fetchedData = useFetchDataFromIDB();

	const fetchedDataHandler = async () => {
		return await fetchedData(isFavourite);
	};
	const liveQuery = useLiveQuery(fetchedDataHandler, [isFavourite]);
	if (liveQuery === undefined) {
		return (
			<Spinner>
				<BarLoader height={5} width={400} color="#d9d9d9" />
			</Spinner>
		);
	}
	return (
		<>
			<AddBookProvider>
				{liveQuery.length > 0 ? (
					liveQuery.map((book, index) => (
						<ChapterForLibrary
							isEditable={isEditable}
							key={index} //change it to manhwa_id later
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
					<DivWrapper>
						<Header>No Books Found in Your Library or Favorites</Header>
						<Text $fontWeight={500}>
							It looks like your library and favorites are currently empty. Add
							some books to start building your collection and filling your
							favorites. Happy reading!
						</Text>
					</DivWrapper>
				)}
			</AddBookProvider>
		</>
	);
};
ChapterListForLibrary.propTypes = {
	isEditable: PropTypes.bool.isRequired,
	isFavourite: PropTypes.bool.isRequired,
};

export default ChapterListForLibrary;
