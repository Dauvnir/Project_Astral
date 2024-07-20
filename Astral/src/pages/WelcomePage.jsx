import styled from "styled-components";
import MainBackground from "../components/MainBackground";
import WelcomeMsg from "../components/WelcomeMsg";
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
import ImageCarouselWelcome from "../components/ImageCarouselWelcome";

const ResponsiveWrapperFlex = styled(WrapperFlex)`
	width: 100vw;
	flex-wrap: wrap;
	align-items: flex-start;
`;

const WelcomePage = () => {
	let navigate = useNavigate();
	const toWelcomePage = () => {
		let path = "/";
		navigate(path);
	};
	return (
		<>
			<a id="top"></a>
			<MainBackground></MainBackground>
			<div className="overlay"></div>
			<WrapperFlex
				$margin=" 1rem auto 2rem auto"
				onClick={toWelcomePage}
				style={{ cursor: "pointer" }}
				$width="clamp(10rem, 95%, 50rem)">
				<StyledLogo></StyledLogo>
			</WrapperFlex>
			<WelcomeMsg></WelcomeMsg>
			<ImageCarouselWelcome />
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
