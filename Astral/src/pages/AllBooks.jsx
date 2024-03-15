import { useNavigate } from "react-router-dom";
import StyledLogo from "../components/LogoHeader";
import MainBackground from "../components/MainBackground";
import Menu from "../components/Menu";
import { WrapperFlex } from "../components/WrapperFlex";
import Avatar from "../components/Avatar";
import styled from "styled-components";
import { LineBreak } from "../components/LineBreak";
import Footer from "../components/Footer";
import WrapperGrid from "../components/WrapperGrid";
// import Chapter from "../components/Chapter";

import MoveToTop from "../components/MoveToTop";
import { Paragraph } from "../components/Paragraph";
import ImgCarouselWrapper from "../components/ImgCarouselWrapper";
import AllBooksComponent from "../components/AllBooksComponent";
const BookWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: rgba(29, 37, 53, 0.7);
	box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.56);
	width: calc(100% + 2rem);
	position: relative;
	z-index: 3;
	padding-block: 1rem;
	margin-left: -1rem;
	margin-top: 3rem;
`;

const AllBooks = () => {
	let navigate = useNavigate();
	const toLibrary = () => {
		let path = `/library`;
		navigate(path);
	};

	return (
		<>
			<MainBackground />
			<div className="overlay"></div>
			<Menu />
			<WrapperFlex style={{ cursor: "pointer", marginBottom: "1.5rem" }} onClick={toLibrary}>
				<StyledLogo />
			</WrapperFlex>
			<Avatar />
			<Paragraph
				$textAlign="left"
				$fontSize="clamp(2rem, 2vw + 1rem , 5rem)"
				$fontWeight="600"
				style={{ position: "relative", zIndex: "2", marginTop: "1.5rem" }}>
				Popular Today
			</Paragraph>
			<WrapperFlex
				style={{
					marginBottom: "1.5rem",
					width: "calc(100% + 2rem)",
					marginLeft: "-1rem",
					overflow: "visible",
				}}>
				<WrapperFlex $width="100%">
					<ImgCarouselWrapper></ImgCarouselWrapper>
				</WrapperFlex>
			</WrapperFlex>
			<AllBooksComponent></AllBooksComponent>
			<LineBreak style={{ margin: "0 0 0 -1rem", width: "calc(100% + 2rem)" }}></LineBreak>
			<BookWrapper style={{ marginTop: "0rem", height: "auto" }}>
				<WrapperGrid style={{ paddingInline: "1rem" }}>
					{/* {manhwasListAll.map(
						({ scanlation_site, title, srcimg, websiteUrl, chapter, manhwa_id }) => (
							<Chapter
								key={manhwa_id}
								scanlationSite={scanlation_site}
								title={title}
								imageUrl={srcimg}
								websiteUrl={websiteUrl}
								chapterNumber={chapter}></Chapter>
						)
					)} */}
				</WrapperGrid>
			</BookWrapper>
			<MoveToTop />
			<Footer />
		</>
	);
};

export default AllBooks;
