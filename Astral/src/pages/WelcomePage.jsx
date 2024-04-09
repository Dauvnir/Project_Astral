import styled from "styled-components";
import MainBackground from "../components/MainBackground";
import WelcomeMsg from "../components/WelcomeMsg";
import ImgCarouselWrapper from "../components/ImgCarouselWrapper";
import JoinMsg from "../components/JoinMsg";
import LibraryBtn from "../components/LibraryBtn";
import Indicator from "../components/Indicator";
import StyledLogo from "../components/LogoHeader";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import Form from "../components/Form";
import MoveToTop from "../components/MoveToTop";
import { WrapperFlex } from "../components/WrapperFlex";
import { useNavigate } from "react-router-dom";

const ResponsiveWrapperFlex = styled(WrapperFlex)`
	flex-wrap: wrap;
	@media only screen and (min-width: 800px) {
		flex-wrap: nowrap !important;
		gap: 3rem;
		align-items: flex-start;
		justify-content: center;
	}
`;

const WelcomePage = () => {
	let navigate = useNavigate();
	const toWelcomePage = () => {
		let path = `/`;
		navigate(path);
	};
	return (
		<>
			<a id="top"></a>
			<MainBackground></MainBackground>
			<div className="overlay"></div>
			<WrapperFlex $margin=" 1rem 0 2rem 0" onClick={toWelcomePage} style={{ cursor: "pointer" }}>
				<StyledLogo></StyledLogo>
			</WrapperFlex>
			<WelcomeMsg></WelcomeMsg>
			<ImgCarouselWrapper></ImgCarouselWrapper>
			<JoinMsg></JoinMsg>
			<LibraryBtn></LibraryBtn>
			<Indicator></Indicator>
			<ResponsiveWrapperFlex>
				<AboutUs></AboutUs>
				<Form></Form>
			</ResponsiveWrapperFlex>
			<MoveToTop></MoveToTop>
			<Footer></Footer>
		</>
	);
};

export default WelcomePage;
