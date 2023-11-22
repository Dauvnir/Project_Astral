import Background from './components/Background';
<<<<<<< Updated upstream
function App() {
	return <Background></Background>;
}
=======
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
>>>>>>> Stashed changes

export default App;
