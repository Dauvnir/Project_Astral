import Background from './components/Background';
import ImgCarouselWrapper from './components/ImgCarouselWrapper';
import LogoHeader from './components/LogoHeader';
import WelcomeMsg from './components/WelcomeMsg';
import JoinMsg from './components/JoinMsg';
import LibraryBtn from './components/LibraryBtn';
import {Indicator} from './components/Indicator';
const App = () => {
	return (
		<>
			<Background></Background>
			<LogoHeader></LogoHeader>
			<WelcomeMsg></WelcomeMsg>
			<ImgCarouselWrapper></ImgCarouselWrapper>
			<JoinMsg></JoinMsg>
			<LibraryBtn></LibraryBtn>
			<Indicator></Indicator>
		</>
	);
};

export default App;
