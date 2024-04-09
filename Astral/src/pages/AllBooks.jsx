import { useNavigate } from "react-router-dom";
import StyledLogo from "../components/LogoHeader";
import MainBackground from "../components/MainBackground";
import Menu from "../components/Menu";
import { WrapperFlex } from "../components/WrapperFlex";
import Avatar from "../components/Avatar";
import Footer from "../components/Footer";
import MoveToTop from "../components/MoveToTop";
import { Paragraph } from "../components/Paragraph";
import ImgCarouselWrapper from "../components/ImgCarouselWrapper";
import AllBooksChapter from "../components/AllBooksChapter";

const AllBooks = () => {
	let navigate = useNavigate();
	const toLibrary = () => {
		let path = `/library`;
		navigate(path);
	};

	return (
		<>
			<a id="top"></a>
			<MainBackground />
			<div className="overlay"></div>
			<Menu />
			<WrapperFlex
				style={{ cursor: "pointer", marginBottom: "1.5rem", marginTop: "1rem" }}
				onClick={toLibrary}>
				<StyledLogo />
			</WrapperFlex>
			<Avatar />
			<Paragraph
				$textAlign="left"
				$fontSize="clamp(2rem, 2vw + 1rem , 5rem)"
				$fontWeight="600"
				style={{ position: "relative", zIndex: "2", marginTop: "1.5rem", marginLeft: "1rem" }}>
				Popular Today
			</Paragraph>
			<WrapperFlex
				style={{
					marginBottom: "1.5rem",
					width: "100vw",
					overflow: "visible",
				}}>
				<WrapperFlex $width="100vw">
					<ImgCarouselWrapper></ImgCarouselWrapper>
				</WrapperFlex>
			</WrapperFlex>
			<AllBooksChapter />
			<MoveToTop />
			<Footer />
		</>
	);
};

export default AllBooks;
