import MainBackground from "../components/MainBackground";
import Menu from "../components/Menu";
import Avatar from "../components/Avatar";
import StyledLogo from "../components/LogoHeader";
import { WrapperFlex } from "../components/WrapperFlex";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import MoveToTop from "../components/MoveToTop";
import { Paragraph } from "../components/Paragraph";
import ImgCarouselWrapper from "../components/ImgCarouselWrapper";

const MainPage = () => {
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
				$width="clamp(10rem, 95%, 50rem)"
				style={{
					cursor: "pointer",
					margin: " 1rem auto 2rem auto",
				}}
				onClick={toLibrary}>
				<StyledLogo />
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
				Random Pick
			</Paragraph>

			<WrapperFlex
				$width="100vw"
				style={{
					marginBottom: "1rem",
				}}>
				<ImgCarouselWrapper />
			</WrapperFlex>
			<Outlet />
			<MoveToTop />
			<Footer />
		</>
	);
};

export default MainPage;
