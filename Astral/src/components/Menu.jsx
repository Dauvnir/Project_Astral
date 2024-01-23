import styled from 'styled-components';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdManageAccounts } from 'react-icons/md';
import { IoAdd } from 'react-icons/io5';
import { IoHeartSharp } from 'react-icons/io5';
import { FaBook } from 'react-icons/fa';
import MenuExtended from './MenuExtended';
import { useState, useEffect, useRef } from 'react';

import MenuExtendedAccount from './MenuExtendedAccount';
import ChangeWindowTemplate from './ChangeWindowTemplate';
import { Paragraph } from './Paragraph';
import { StyledInput } from './StyledInput';
import { Label } from './Label';
import PropTypes from 'prop-types';
import { WrapperFlex } from './WrapperFlex';
import { StyledForm } from '../components/StyledForm';
import { useNavigate } from 'react-router-dom';

const StyledTextarea = styled.textarea`
	width: 100%;
	height: 6rem;
	resize: none;
	box-sizing: border-box;
	font-size: clamp(1rem, 1vw + 1rem, 1.5rem);
	padding: 0.5rem;
	border-radius: 5px;
	font-weight: 600;
	border: none;
	box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);
	outline: none;
`;
const WrapDivForm = styled.div`
	width: 100%;
`;
const ExtendedParagraph = styled(Paragraph)`
	text-align: left;
	padding-bottom: 0.5rem;
	font-size: clamp(1rem, 1vw + 1rem, 1.5rem);
`;
const MenuStyled = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	z-index: 5;
	width: clamp(12rem, calc(100% - 2rem), 35rem);
	height: 4rem;
	left: 50%;
	transform: translateX(-50%);
	bottom: 2rem;
	border-radius: 20px;
	background: rgba(29, 37, 53, 1);
	overflow: visible;
	box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.56);

	@media (min-width: 550px) {
		height: 4.5rem;
	}
	@media (min-width: 800px) {
		height: 5rem;
	}
	@media (min-width: 1200px) {
		display: none;
	}
`;

const WrapperIcon = styled.div`
	display: flex;
	justify-content: center;
	align-content: center;
	position: relative;
	z-index: 4;
	height: 100%;
	width: 17%;
	padding-block: 10px;
	padding-inline: 0.5rem;
	overflow: hidden;
	cursor: pointer;
	&:hover {
		background: rgba(217, 217, 217, 0.9);
		transition: background ease 0.5s;
		:is(svg) {
			color: rgba(29, 37, 53, 1);
			transition: color ease 0.5s;
		}
	}
`;
const WrapperIconLeft = styled(WrapperIcon)`
	border-bottom-left-radius: 20px;
	border-top-left-radius: 20px;
`;
const WrapperIconRight = styled(WrapperIcon)`
	border-bottom-right-radius: 20px;
	border-top-right-radius: 20px;
`;
const WrapperIconCircle = styled.div`
	display: flex;
	position: absolute;
	align-items: center;
	justify-content: center;
	left: 0;
	right: 0;
	margin-left: auto;
	margin-right: auto;
	z-index: 5;
	width: 5rem;
	height: 5rem;
	overflow: visible;
	border-radius: 50%;
	background-color: rgba(29, 37, 53, 1);
	box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.56);
	cursor: pointer;
	&:hover {
		background: rgba(217, 217, 217, 0.9);
		transition: background ease 0.5s;
		:is(svg) {
			color: rgba(29, 37, 53, 1);
			transition: color ease 0.5s;
		}
	}
	@media (min-width: 500px) {
		width: 6rem;
		height: 6rem;
	}
`;
const Hamburger = styled(RxHamburgerMenu)`
	display: inline-block;
	height: 100%;
	width: 100%;
	color: #d9d9d9;
`;
const Account = styled(MdManageAccounts)`
	display: inline-block;
	height: 100%;
	width: 100%;
	color: #d9d9d9;
`;
const Add = styled(IoAdd)`
	width: 8rem;
	height: 8rem;
	border-radius: 100%;
	color: #d9d9d9;
`;
const Favorite = styled(IoHeartSharp)`
	height: 100%;
	width: 100%;
	color: #d9d9d9;
`;

const AllBooksIcon = styled(FaBook)`
	display: inline-block;
	height: 100%;
	width: 100%;
	color: #d9d9d9;
`;
const Input = styled(StyledInput)`
	margin: 1rem auto;
`;
const WindowTemplateStyling = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	position: absolute;
	z-index: 5;
	width: clamp(15rem, 80%, 30rem);
	height: auto;
	margin: 0 auto;
	background-color: rgba(29, 37, 53, 1);
	left: 50%;
	top: 50%;
	transform: translate3D(-50%, -50%, 0);
	border-radius: 10%;
	padding: 1rem;
	box-shadow: rgba(0, 0, 0, 0.56) 0px 0px 10px 4px;
`;
const Image = styled.img`
	position: relative;
	z-index: 2;
	width: 7rem;
	height: 11rem;
	border-radius: 0.3125rem;
	border: 2px solid #000;
	box-shadow: 0px 4px 4px 1px rgba(0, 0, 0, 0.56);
	object-fit: cover;
`;
const ChangeEmail = ({ resetComponent }) => {
	const [manageState, setManageState] = useState(true);
	const closeHandler = (closeHandler) => {
		setManageState(closeHandler);
		resetComponent(closeHandler);
	};
	return (
		<>
			{manageState ? (
				<WindowTemplateStyling>
					<Paragraph $fontSize='2rem' $fontWeight='500' $margin='0 auto 1rem auto'>
						Change Email
					</Paragraph>
					<Label $textAlign='left' $width='100%' $cursor='default'>
						New Email
					</Label>
					<Input placeholder='New Email'></Input>
					<Label $textAlign='left' $width='100%' $cursor='default'>
						Confirm New Email
					</Label>
					<Input placeholder='Confirm New Email ?'></Input>
					<ChangeWindowTemplate closeHandler={closeHandler} />
				</WindowTemplateStyling>
			) : null}
		</>
	);
};
const ChangePassword = ({ resetComponent }) => {
	const [manageState, setManageState] = useState(true);
	const closeHandler = (closeHandler) => {
		setManageState(closeHandler);
		resetComponent(closeHandler);
	};

	return (
		<>
			{manageState ? (
				<WindowTemplateStyling>
					<Paragraph $fontSize='2rem' $fontWeight='500' $margin='0 auto 1rem auto'>
						Change Password
					</Paragraph>
					<Label $textAlign='left' $width='100%' $cursor='default'>
						Old Password
					</Label>
					<Input placeholder='Old Password'></Input>
					<Label $textAlign='left' $width='100%' $cursor='default'>
						New Password
					</Label>
					<Input placeholder='New Password'></Input>
					<Label $textAlign='left' $width='100%' $cursor='default'>
						Confirm New Password
					</Label>
					<Input placeholder='Confirm New Password'></Input>
					<ChangeWindowTemplate closeHandler={closeHandler} />
				</WindowTemplateStyling>
			) : null}
		</>
	);
};
const ChangeNickname = ({ resetComponent }) => {
	const [manageState, setManageState] = useState(true);
	const closeHandler = (closeHandler) => {
		setManageState(closeHandler);
		resetComponent(closeHandler);
	};
	return (
		<>
			{manageState ? (
				<WindowTemplateStyling>
					<Paragraph $fontSize='2rem' $fontWeight='500' $margin='0 auto 1rem auto'>
						Change Nickname
					</Paragraph>
					<Label $textAlign='left' $width='100%' $cursor='default'>
						New Nickname
					</Label>
					<Input placeholder='New Nickname'></Input>
					<ChangeWindowTemplate closeHandler={closeHandler} />
				</WindowTemplateStyling>
			) : null}
		</>
	);
};
const ChangeAvatar = ({ resetComponent }) => {
	const [manageState, setManageState] = useState(true);
	const closeHandler = (closeHandler) => {
		setManageState(closeHandler);
		resetComponent(closeHandler);
	};
	return (
		<>
			{manageState ? (
				<WindowTemplateStyling>
					<Paragraph $fontSize='2rem' $fontWeight='500' $margin='0 auto 1rem auto'>
						Change Avatar
					</Paragraph>
					<Paragraph $fontSize='1.125rem' $fontWeight='500' $margin='0 auto 1rem auto'>
						There should be possibility to change picture.
					</Paragraph>
					<ChangeWindowTemplate closeHandler={closeHandler} />
				</WindowTemplateStyling>
			) : null}
		</>
	);
};
const DeleteAccount = ({ resetComponent }) => {
	const [manageState, setManageState] = useState(true);
	const closeHandler = (closeHandler) => {
		setManageState(closeHandler);
		resetComponent(closeHandler);
	};
	return (
		<>
			{manageState ? (
				<WindowTemplateStyling>
					<Paragraph $fontSize='2rem' $fontWeight='500' $margin='0 auto 1rem auto'>
						Delete Account
					</Paragraph>
					<Paragraph $fontSize='1.125rem' $fontWeight='500' $margin='0 auto 1rem auto'>
						Do you really want to leave us? Are you sure about this ? All your information will be
						deleted.
					</Paragraph>
					<ChangeWindowTemplate closeHandler={closeHandler} />
				</WindowTemplateStyling>
			) : null}
		</>
	);
};
const Logout = ({ resetComponent }) => {
	const [manageState, setManageState] = useState(true);
	const closeHandler = (closeHandler) => {
		setManageState(closeHandler);
		resetComponent(closeHandler);
	};
	return (
		<>
			{manageState ? (
				<WindowTemplateStyling>
					<Paragraph $fontSize='2rem' $fontWeight='500' $margin='0 auto 1rem auto'>
						Logout
					</Paragraph>
					<Paragraph $fontSize='1.125rem' $fontWeight='500' $margin='0 auto 1rem auto'>
						Do you really want to logout from your library?
					</Paragraph>
					<ChangeWindowTemplate closeHandler={closeHandler} />
				</WindowTemplateStyling>
			) : null}
		</>
	);
};
const AboutUs = ({ resetComponent }) => {
	const [manageState, setManageState] = useState(true);
	const closeHandler = (closeHandler) => {
		setManageState(closeHandler);
		resetComponent(closeHandler);
	};
	return (
		<>
			{manageState ? (
				<WindowTemplateStyling>
					<Paragraph $fontSize='2rem' $fontWeight='500' $margin='0 auto 1rem auto'>
						About Us
					</Paragraph>
					<WrapperFlex>
						<Paragraph
							style={{ width: '70%' }}
							$fontSize='1.125rem'
							$fontWeight='500'
							$margin='0 auto 1rem auto'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel condimentum nisi.
							Cras sollicitudin orci tempus consequat pretium. Fusce erat magna, mollis imperdiet
							odio eu, vestibulum rutrum ipsum.
						</Paragraph>
						<Image
							src={
								'https://img.asuracomics.com/unsafe/fit-in/720x936/https://asuratoon.com/wp-content/uploads/2022/09/EstateDevCover01.png'
							}></Image>
					</WrapperFlex>
					<ChangeWindowTemplate closeHandler={closeHandler} />
				</WindowTemplateStyling>
			) : null}
		</>
	);
};
const ReportBug = ({ resetComponent }) => {
	const [manageState, setManageState] = useState(true);
	const closeHandler = (closeHandler) => {
		setManageState(closeHandler);
		resetComponent(closeHandler);
	};
	return (
		<>
			{manageState ? (
				<WindowTemplateStyling>
					<Paragraph
						$fontSize='2rem'
						$fontWeight='600'
						$textAlign='center'
						style={{ width: '100%', marginBottom: '1rem' }}>
						Report Bug
					</Paragraph>
					<StyledForm id='form' method='post' action=''>
						<WrapperFlex $flexWrap='wrap' $gap='1rem' $overflow='visible'>
							<WrapDivForm>
								<ExtendedParagraph>Your e-mail address.</ExtendedParagraph>
								<StyledInput
									pattern='[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'
									required
									type='e-mail'
									placeholder='E-mail'></StyledInput>
							</WrapDivForm>
							<WrapDivForm>
								<ExtendedParagraph>You want to talk about..</ExtendedParagraph>
								<StyledInput required placeholder='Topic'></StyledInput>
							</WrapDivForm>
							<WrapDivForm>
								<ExtendedParagraph>Your message.</ExtendedParagraph>
								<StyledTextarea
									required
									placeholder='I want to say that I very like eating tacos....'></StyledTextarea>
							</WrapDivForm>
						</WrapperFlex>
					</StyledForm>
					<ChangeWindowTemplate closeHandler={closeHandler} />
				</WindowTemplateStyling>
			) : null}
		</>
	);
};
const Menu = () => {
	const windowSize = useRef([window.innerWidth, window.innerHeight]);
	const [showValue, setShowValue] = useState(0);
	const menuHidingHandler = () => {
		if (windowSize.current[0] >= 550) {
			if (showValue == 0) {
				setShowValue(25.5);
				setShowValue2(0);
			} else {
				setShowValue(0);
			}
		}
		if (windowSize.current[0] < 550) {
			if (showValue == 0) {
				setShowValue(21);
				setShowValue2(0);
			} else {
				setShowValue(0);
			}
		}
	};
	const [showValue2, setShowValue2] = useState(0);
	const menuHidingHandler2 = () => {
		if (windowSize.current[0] >= 550) {
			if (showValue2 == 0) {
				setShowValue2(25.5);
				setShowValue(0);
			} else {
				setShowValue2(0);
			}
		}
		if (windowSize.current[0] < 550) {
			if (showValue2 == 0) {
				setShowValue2(21);
				setShowValue(0);
			} else {
				setShowValue2(0);
			}
		}
	};
	const [activeComponent, setActiveComponent] = useState(null);
	const showComponent = (componentName) => {
		setActiveComponent(componentName);
		setShowValue2(0);
		setShowValue(0);
	};
	// eslint-disable-next-line no-unused-vars
	const [resetComponentValue, setResetComponent] = useState(null);
	const resetComponent = (resetValue, componentName) => {
		setResetComponent(resetValue);
		!resetComponentValue ? setActiveComponent(null) : setActiveComponent(componentName);
	};
	let navigate = useNavigate();
	const toBooks = () => {
		let path = `/library/allBooks`;
		navigate(path);
	};

	let menuRef = useRef();
	let extendedMenuRef = useRef();
	let extendedMenuAccountRef = useRef();
	useEffect(() => {
		let handler = (e) => {
			if (
				!menuRef.current.contains(e.target) &&
				!extendedMenuRef.current.contains(e.target) &&
				!extendedMenuAccountRef.current.contains(e.target)
			) {
				setShowValue2(0);
				setShowValue(0);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	}, []);

	return (
		<>
			{activeComponent === 'ChangePassword' && (
				<ChangePassword
					onShow={() => showComponent('ChangePassword')}
					resetComponent={resetComponent}
				/>
			)}
			{activeComponent === 'ChangeEmail' && (
				<ChangeEmail onShow={() => showComponent('ChangeEmail')} resetComponent={resetComponent} />
			)}
			{activeComponent === 'ChangeNickname' && (
				<ChangeNickname
					onShow={() => showComponent('ChangeNickname')}
					resetComponent={resetComponent}
				/>
			)}
			{activeComponent === 'ChangeAvatar' && (
				<ChangeAvatar
					onShow={() => showComponent('ChangeAvatar')}
					resetComponent={resetComponent}
				/>
			)}
			{activeComponent === 'DeleteAccount' && (
				<DeleteAccount
					onShow={() => showComponent('DeleteAccount')}
					resetComponent={resetComponent}
				/>
			)}
			{activeComponent === 'LogOut' && (
				<Logout onShow={() => showComponent('LogOut')} resetComponent={resetComponent} />
			)}
			{activeComponent === 'AboutUs' && (
				<AboutUs onShow={() => showComponent('AboutUs')} resetComponent={resetComponent} />
			)}
			{activeComponent === 'ReportBug' && (
				<ReportBug onShow={() => showComponent('AboutUs')} resetComponent={resetComponent} />
			)}
			<MenuExtended $heightMenu={showValue} onShow={showComponent} ref={extendedMenuRef} />
			<MenuExtendedAccount
				$heightMenu={showValue2}
				onShow={showComponent}
				ref={extendedMenuAccountRef}
			/>
			<MenuStyled style={{ pointerEvents: activeComponent ? 'none' : 'auto' }} ref={menuRef}>
				<WrapperIconLeft onClick={menuHidingHandler}>
					<Hamburger />
				</WrapperIconLeft>
				<WrapperIcon
					onClick={menuHidingHandler2}
					style={{ width: '33%', paddingRight: '3.5rem' }}
					ref={menuRef}>
					<Account></Account>
				</WrapperIcon>
				<WrapperIconCircle>
					<Add></Add>
				</WrapperIconCircle>
				<WrapperIcon style={{ width: '33%', paddingLeft: '3.5rem' }}>
					<Favorite></Favorite>
				</WrapperIcon>
				<WrapperIconRight>
					<AllBooksIcon onClick={toBooks} />
				</WrapperIconRight>
			</MenuStyled>
		</>
	);
};
ChangePassword.propTypes = {
	resetComponent: PropTypes.func,
};
ChangeNickname.propTypes = {
	resetComponent: PropTypes.func,
};
ChangeAvatar.propTypes = {
	resetComponent: PropTypes.func,
};
ChangeEmail.propTypes = {
	resetComponent: PropTypes.func,
};
DeleteAccount.propTypes = {
	resetComponent: PropTypes.func,
};
Logout.propTypes = {
	resetComponent: PropTypes.func,
};
AboutUs.propTypes = {
	resetComponent: PropTypes.func,
};
ReportBug.propTypes = {
	resetComponent: PropTypes.func,
};
export default Menu;
