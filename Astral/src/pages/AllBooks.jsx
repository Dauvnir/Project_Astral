import { useNavigate } from 'react-router-dom';
import StyledLogo from '../components/LogoHeader';
import MainBackground from '../components/MainBackground';
import Menu from '../components/Menu';
import { WrapperFlex } from '../components/WrapperFlex';
import Avatar from '../components/Avatar';
import styled from 'styled-components';
import { LineBreak } from '../components/LineBreak';
import Footer from '../components/Footer';
import WrapperGrid from '../components/WrapperGrid';
import Chapter from '../components/Chapter';

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
	margin-top: 3rem;
`;
const Title = styled.span`
	text-align: left;
	font-size: clamp(2rem, 2vw + 1rem, 5rem);
	font-weight: 600;
	font-family: Lato;
	color: #d9d9d9;
	font-style: normal;
	line-height: normal;
	z-index: 2;
	margin-left: 1.5rem;
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
			<Menu />
			<WrapperFlex style={{ cursor: 'pointer', marginBottom: '1.5rem' }} onClick={toLibrary}>
				<StyledLogo />
			</WrapperFlex>
			<Avatar />
			<BookWrapper>
				<Title>All Books</Title>
			</BookWrapper>
			<LineBreak style={{ margin: '0 0 0 -1rem', width: 'calc(100% + 2rem)' }}></LineBreak>
			<BookWrapper style={{ marginTop: '0rem' }}>
				<WrapperGrid style={{ paddingInline: '1rem' }}>
					<Chapter></Chapter>
					<Chapter></Chapter>
					<Chapter></Chapter>
					<Chapter></Chapter>
					<Chapter></Chapter>
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
			</BookWrapper>
			<Footer />
		</>
	);
};

export default AllBooks;
