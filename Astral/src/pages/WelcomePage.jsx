import MainBackground from '../components/MainBackground';
import WelcomeMsg from '../components/WelcomeMsg';
import ImgCarouselWrapper from '../components/ImgCarouselWrapper';
import JoinMsg from '../components/JoinMsg';
import LibraryBtn from '../components/LibraryBtn';
import Indicator from '../components/Indicator';
import LogoHeader from '../components/LogoHeader';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';

const WelcomePage = () => {
	return (
		<>
			<MainBackground></MainBackground>
			<LogoHeader></LogoHeader>
			<WelcomeMsg></WelcomeMsg>
			<ImgCarouselWrapper></ImgCarouselWrapper>
			<JoinMsg></JoinMsg>
			<LibraryBtn></LibraryBtn>
			<Indicator></Indicator>
			<AboutUs></AboutUs>
			<Footer></Footer>
		</>
	);
};

export default WelcomePage;
