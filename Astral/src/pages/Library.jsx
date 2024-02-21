import MainBackground from '../components/MainBackground';
import StyledLogo from '../components/LogoHeader';
import { WrapperFlex } from '../components/WrapperFlex';
import { Paragraph } from '../components/Paragraph';
import ImgCarouselWrapper from '../components/ImgCarouselWrapper';
import { LineBreak } from '../components/LineBreak';
import styled from 'styled-components';
import LockBtn from '../components/LockBtn';
import SortBtn from '../components/SortBtn';
import BookmarkBtn from '../components/BookmarkBtn';
import WrapperGrid from '../components/WrapperGrid';
import Chapter from '../components/Chapter';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar';
import MoveToTop from '../components/MoveToTop';

const BookWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: rgba(29, 37, 53, 0.7);
	box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.56);
	width: calc(100% + 2rem);
	height: auto;
	position: relative;
	z-index: 2;
	padding-block: 1rem;
	margin-left: -1rem;
`;
const ChapterWrapper = styled.div`
	background-color: rgba(29, 37, 53, 0.7);
	width: calc(100% + 2rem);
	height: auto;
	flex-grow: 1;
	position: relative;
	z-index: 2;
	padding: 1rem 1rem;
	margin-left: -1rem;
	overflow: hidden;
`;
const ModifiedWrapperFlex = styled(WrapperFlex)`
	overflow: visible;
	width: auto;
	margin-left: 1rem;
	@media (min-width: 501px) {
		margin-left: 1rem;
	}
	@media (min-width: 801px) {
		margin-left: 2rem;
	}
`;
const ModifiedWrapperFlexBtn = styled(WrapperFlex)`
	overflow: visible;
	width: auto;
	gap: 1rem;
	justify-content: flex-start;
	transform: scale(0.9);
	margin-right: 0.25rem;
	@media (min-width: 501px) {
		transform: scale(1);
		margin-right: 1rem;
	}
	@media (min-width: 801px) {
		gap: 2rem;
		margin-right: 2rem;
	}
`;

const Library = () => {
	let navigate = useNavigate();
	const toLibrary = () => {
		let path = `/library`;
		navigate(path);
	};
	return (
		<>
			<MainBackground></MainBackground>
			<div className='overlay'></div>
			<Menu></Menu>
			<WrapperFlex style={{ cursor: 'pointer', marginBottom: '1.5rem' }} onClick={toLibrary}>
				<StyledLogo></StyledLogo>
			</WrapperFlex>
			<Avatar />
			<Paragraph
				$textAlign='left'
				$fontSize='clamp(2rem, 2vw + 1rem , 5rem)'
				$fontWeight='600'
				style={{ position: 'relative', zIndex: '2', marginTop: '1.5rem' }}>
				Popular Today
			</Paragraph>
			<WrapperFlex
				style={{
					marginBottom: '1.5rem',
					width: 'calc(100% + 2rem)',
					marginLeft: '-1rem',
					overflow: 'visible',
				}}>
				<WrapperFlex $width='100%'>
					<ImgCarouselWrapper></ImgCarouselWrapper>
				</WrapperFlex>
			</WrapperFlex>
			<BookWrapper>
				<ModifiedWrapperFlex>
					<Paragraph $fontSize='clamp(2rem, 2vw + 1rem , 5rem)' $textAlign='left' $fontWeight='600'>
						Library
					</Paragraph>
				</ModifiedWrapperFlex>
				<ModifiedWrapperFlexBtn>
					<LockBtn></LockBtn>
					<SortBtn></SortBtn>
					<BookmarkBtn></BookmarkBtn>
				</ModifiedWrapperFlexBtn>
			</BookWrapper>
			<LineBreak
				style={{ margin: '0 0 0 -1rem', width: 'calc(100% + 2rem)', height: '2px' }}></LineBreak>
			<ChapterWrapper>
				<WrapperGrid>
					<Chapter></Chapter>
					<Chapter></Chapter>
					<Chapter></Chapter>
					<Chapter></Chapter>
					<Chapter></Chapter>
					<Chapter></Chapter>
					<Chapter></Chapter>
					<Chapter></Chapter>
					<Chapter></Chapter>
				</WrapperGrid>
			</ChapterWrapper>
			<MoveToTop></MoveToTop>
			<Footer />
		</>
	);
};

export default Library;
