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
import { GoListUnordered } from 'react-icons/go';
import { SortList } from '../components/SortList';
import { useState, useEffect, useRef } from 'react';
import MoveToTop from '../components/MoveToTop';
import SearchBar from '../components/SearchBar';
import { IoSearchOutline } from 'react-icons/io5';
import SearchBarConditional from '../components/SearchBarConditional';
const BookWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: rgba(29, 37, 53, 0.7);
	box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.56);
	width: calc(100% + 2rem);
	height: auto;
	position: relative;
	z-index: 3;
	padding-block: 1rem;
	margin-left: -1rem;
	margin-top: 3rem;
`;
const Title = styled.p`
	text-align: left;
	font-size: clamp(2rem, 2vw + 1rem, 5rem);
	font-weight: 600;
	font-family: Lato;
	color: #d9d9d9;
	font-style: normal;
	line-height: normal;
	z-index: 2;
	margin-left: 2rem;
	width: 50%;
	height: 100%;
`;
const SortStyled = styled(GoListUnordered)`
	color: #d9d9d9e6;
	width: 90%;
	height: auto;
	position: relative;
	z-index: 5;
`;

const StyledDiv = styled.div`
	display: flex;
	position: relative;
	z-index: 5;
	justify-content: center;
	align-items: center;
	border: 1px solid #afbfd5;
	background: rgba(29, 37, 53, 1);
	border-radius: 10px 10px 0px 0px;
	margin-right: 2rem;
	width: 56px;
	height: 56px;
	cursor: pointer;
	&:hover {
		background: rgba(217, 217, 217, 0.9);
		transition: background linear 0.3s;
		:is(svg) {
			color: rgba(29, 37, 53, 1);
			transition: color linear 0.3s;
		}
	}
	@media (max-width: 400px) {
		margin-right: 1rem;
	}
`;
const UlStyled = styled.ul`
	width: 100%;
	height: 100%;
	list-style: none;
`;
const LiStyled = styled.li`
	display: flex;
	justify-content: center;
	text-align: center;
	height: 25%;
	width: 100%;
	border-bottom: 1px solid #afbfd5;
`;
const ButtonStyled = styled.button`
	color: rgba(217, 217, 217, 0.9);
	width: 100%;
	background: none;
	border: none;
	text-align: left;
	cursor: pointer;
	&:hover {
		background: rgba(217, 217, 217, 0.9);
		transition: background linear 0.3s;
		:is(span) {
			color: rgba(29, 37, 53, 1);
			transition: color linear 0.3s;
		}
	}
`;
const SpanStyled = styled.span`
	color: #d9d9d9;
	font-family: Lato;
	font-size: 1.125rem;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	padding-left: 0.5rem;
`;
const SearchBtn = styled(StyledDiv)`
	display: none;
	@media (max-width: 519px) {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;
const SearchStyled = styled(IoSearchOutline)`
	width: 80%;
	color: #d9d9d9e6;
	height: auto;
`;

const AllBooks = () => {
	let navigate = useNavigate();
	const toLibrary = () => {
		let path = `/library`;
		navigate(path);
	};
	const [menuSortHeight, setMenuSortHeight] = useState(0);
	const [menuSortClosed, setMenuSortClosed] = useState(true);
	const menuSortHandler = () => {
		setMenuSortClosed((prev) => !prev);
		if (menuSortClosed) {
			setMenuSortHeight(14);
		} else {
			setMenuSortHeight(0);
		}
	};
	let sortMenuRef = useRef();
	let sortMenuBtnRef = useRef();
	let searchBar = useRef();
	useEffect(() => {
		let handler = (e) => {
			if (!sortMenuRef.current.contains(e.target) && !sortMenuBtnRef.current.contains(e.target)) {
				setMenuSortHeight(0);
				setMenuSortClosed((prev) => !prev);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	}, []);
	useEffect(() => {
		let searchhandler = (event) => {
			if (!searchBar.current.contains(event.target)) {
				setHideElements(true);
			}
		};
		document.addEventListener('mousedown', searchhandler);
		return () => {
			document.removeEventListener('mousedown', searchhandler);
		};
	}, []);

	const [hideElements, setHideElements] = useState(true);
	const hideElementsHandler = () => {
		setHideElements((prev) => !prev);
	};
	const windowSize = useRef([window.innerWidth, window.innerHeight]);
	return (
		<>
			<MainBackground />
			<Menu />
			<WrapperFlex style={{ cursor: 'pointer', marginBottom: '1.5rem' }} onClick={toLibrary}>
				<StyledLogo />
			</WrapperFlex>
			<Avatar />
			<BookWrapper
				style={{ zIndex: '4', justifyContent: !hideElements ? 'center' : 'space-between' }}>
				<Title style={{ display: hideElements ? 'block' : 'none' }}>All Books</Title>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyItems: 'center',
						width: !hideElements ? '100%' : 'auto',
					}}>
					{windowSize.current[0] > 518 ? <SearchBar></SearchBar> : null}
					<SearchBarConditional ref={searchBar} hideElements={hideElements} />
					{windowSize.current[0] < 518 ? (
						<SearchBtn
							style={{
								borderRadius: menuSortHeight === 0 ? '10px' : '10px 10px 0px 0px',
								display: hideElements ? 'flex' : 'none',
							}}
							onClick={hideElementsHandler}>
							<SearchStyled />
						</SearchBtn>
					) : null}
					<div style={{ position: 'relative', display: hideElements ? 'flex' : 'none' }}>
						<StyledDiv
							ref={sortMenuBtnRef}
							onClick={menuSortHandler}
							style={{ borderRadius: menuSortHeight === 0 ? '10px' : '10px 10px 0px 0px' }}>
							<SortStyled></SortStyled>
						</StyledDiv>
						<SortList $height={menuSortHeight} ref={sortMenuRef}>
							<UlStyled>
								<LiStyled>
									<ButtonStyled>
										<SpanStyled>Sort by name</SpanStyled>
									</ButtonStyled>
								</LiStyled>
								<LiStyled>
									<ButtonStyled>
										<SpanStyled>Sort by scanlations</SpanStyled>
									</ButtonStyled>
								</LiStyled>
								<LiStyled>
									<ButtonStyled>
										<SpanStyled>Sort by rating</SpanStyled>
									</ButtonStyled>
								</LiStyled>
								<LiStyled style={{ borderBottom: 'none' }}>
									<ButtonStyled>
										<SpanStyled>Sort by chapters</SpanStyled>
									</ButtonStyled>
								</LiStyled>
							</UlStyled>
						</SortList>
					</div>
				</div>
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
			<MoveToTop />
			<Footer />
		</>
	);
};

export default AllBooks;
