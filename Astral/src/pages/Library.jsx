import MainBackground from "../components/MainBackground";
import StyledLogo from "../components/LogoHeader";
import { WrapperFlex } from "../components/WrapperFlex";
import { Paragraph } from "../components/Paragraph";
import ImgCarouselWrapper from "../components/ImgCarouselWrapper";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import MoveToTop from "../components/MoveToTop";
import BooksLibrary from "../components/BooksLibrary";

const Library = () => {
	const navigate = useNavigate();
	const toLibrary = () => {
		const path = `/library`;
		navigate(path);
	};
	return (
		<>
			<a id="top"></a>
			<MainBackground></MainBackground>
			<div className="overlay"></div>
			<Menu></Menu>
			<WrapperFlex
				style={{ cursor: "pointer", margin: "1rem auto 1.5rem auto" }}
				onClick={toLibrary}
				$width="clamp(10rem, 95%, 50rem)">
				<StyledLogo></StyledLogo>
			</WrapperFlex>
			<Avatar />
			<Paragraph
				$textAlign="left"
				$fontSize="clamp(2rem, 2vw + 1rem , 5rem)"
				$fontWeight="600"
				style={{
					position: "relative",
					zIndex: "2",
					marginTop: "1.5rem",
					marginLeft: "1rem",
				}}>
				Popular Today
			</Paragraph>
			<WrapperFlex
				style={{
					marginBottom: "1.5rem",
					width: "100vw",
					overflow: "visible",
				}}>
				<WrapperFlex $width="100%">
					<ImgCarouselWrapper></ImgCarouselWrapper>
				</WrapperFlex>
			</WrapperFlex>
			<BooksLibrary />
			<MoveToTop></MoveToTop>
			<Footer />
		</>
	);
};

export default Library;
