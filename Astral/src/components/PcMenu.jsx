import styled from 'styled-components';
import { FaTrophy } from 'react-icons/fa6';
import { FaBook } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdManageAccounts } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Paragraph } from './Paragraph';
import { StyledInput } from './StyledInput';
import { Label } from './Label';
import { WrapperFlex } from './WrapperFlex';
import ChangeWindowTemplate from './ChangeWindowTemplate';
import { StyledForm } from '../components/StyledForm';
import PropTypes from 'prop-types';

const UlList = styled.ul`
	display: flex;
	list-style: none;
	height: 100%;
`;
const LiElement = styled.li`
	position: relative;
	height: inherit;
`;
const BtnElement = styled.button`
	background-color: rgba(29, 37, 53, 1);
	display: flex;
	place-items: center;
	height: inherit;
	border: none;
	color: #d9d9d9;
	font-size: 1.25rem;
	padding: 1rem;
	cursor: pointer;
	&:hover {
		background: rgba(217, 217, 217, 1);
		transition: background ease 0.5s;
		:is(*) {
			color: rgba(29, 37, 53, 1);
			transition: color ease 0.5s;
		}
	}
`;
const Wrapper = styled.div`
	display: flex;
	height: inherit;
	position: relative;
	z-index: 3;
	box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
	@media (max-width: 1199px) {
		display: none;
	}
`;
const Hamburger = styled(RxHamburgerMenu)`
	display: inline-block;
	height: 70%;
	width: 100%;
	color: #d9d9d9;
`;
const Account = styled(MdManageAccounts)`
	display: inline-block;
	height: 80%;
	width: 100%;
	color: #d9d9d9;
`;

const Leaderboard = styled(FaTrophy)`
	height: 70%;
	width: 100%;
	color: #d9d9d9;
`;

const AllBooksIcon = styled(FaBook)`
	height: 70%;
	width: 100%;
	color: #d9d9d9;
`;
const DropdownIcon = styled(IoMdArrowDropdown)`
	height: 70%;
	width: 70%;
	color: #d9d9d9;
`;
const SubMenu = styled.div`
	display: flex;
	position: absolute;
	z-index: 3;
	left: 0;
	height: ${(props) => props.$height || 0}rem;
	overflow: hidden;
	transition: height 0.2s ease-out;
`;

const AccountSubMenu = styled.div`
	display: flex;
	position: absolute;
	z-index: 3;
	left: 0;
	height: ${(props) => props.$height || 0}rem;
	overflow: hidden;
	transition: height 0.2s ease-out;
`;
const SubMenuBtn = styled(BtnElement)`
	width: 10.45rem;
	border-bottom: 2px solid #afbfd5;
`;
const AccountSubMenuBtn = styled(SubMenuBtn)`
	width: 12.1rem;
`;
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
	top: -20%;
	transform: translate3D(-50%, 20%, 0);
	border-radius: 10%;
	padding: 1rem;
	box-shadow: rgba(0, 0, 0, 0.56) 0px 0px 10px 4px;
	pointer-events: auto;
`;
const Input = styled(StyledInput)`
	margin: 1rem auto;
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
const Notifications = ({ resetComponent }) => {
	const [manageState, setManageState] = useState(true);
	const closeHandler = (closeHandler) => {
		setManageState(closeHandler);
		resetComponent(closeHandler);
	};
	return (
		<>
			{manageState ? (
				<WindowTemplateStyling style={{ top: '40%' }}>
					<Paragraph $fontSize='2rem' $fontWeight='500' $margin='0 auto 1rem auto'>
						Notifications settings
					</Paragraph>
					<Paragraph $fontSize='1.125rem' $fontWeight='500' $margin='0 auto 1rem auto'>
						Do you want to get notifications about new chapters?
					</Paragraph>
					<Paragraph>
						<input type='checkbox' /> Yes, I want.
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
const PcMenu = () => {
	let navigate = useNavigate();
	const toLeaderboard = () => {
		let path = '/library/leaderboard';
		navigate(path);
	};
	let navigate2 = useNavigate();
	const toBooks = () => {
		let path2 = '/library/allBooks';
		navigate2(path2);
	};
	let navigate3 = useNavigate();
	const toHome = () => {
		let path3 = '/library';
		navigate3(path3);
	};
	// eslint-disable-next-line no-unused-vars
	const [subMenuHeight, setSubMenuHeight] = useState(0);
	const subMenuHeightHandler = () => {
		setSubMenuHeight((prevHeight) => {
			if (prevHeight === 0) {
				setAccountSubMenuHeight(0);
				return 18;
			} else {
				return 0;
			}
		});
	};
	// eslint-disable-next-line no-unused-vars
	const [accountSubMenuHeight, setAccountSubMenuHeight] = useState(0);
	const subAccountMenuHeightHandler = () => {
		setAccountSubMenuHeight((prevHeight) => {
			if (prevHeight === 0) {
				setSubMenuHeight(0);
				return 18;
			} else {
				return 0;
			}
		});
	};
	let subMenuRef = useRef();
	let accountMenuRef = useRef();
	useEffect(() => {
		let handler = (e) => {
			if (!subMenuRef.current.contains(e.target) && !accountMenuRef.current.contains(e.target)) {
				setSubMenuHeight(0);
				setAccountSubMenuHeight(0);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	}, []);
	const [resetComponentValue, setResetComponent] = useState(null);
	const [activeComponent, setActiveComponent] = useState(null);
	const showComponent = (componentName) => {
		setActiveComponent(componentName);
		setSubMenuHeight(0);
		setAccountSubMenuHeight(0);
		document.body.classList.add('disableInteractions');
	};
	const resetComponent = (resetValue, componentName) => {
		setResetComponent(resetValue);
		!resetComponentValue ? setActiveComponent(null) : setActiveComponent(componentName);
		document.body.classList.remove('disableInteractions');
	};
	const activeComponent1 = () => {
		setActiveComponent('ChangePassword');
		setSubMenuHeight(0);
		setAccountSubMenuHeight(0);
		document.body.classList.add('disableInteractions');
	};
	const activeComponent2 = () => {
		setActiveComponent('ChangeEmail');
		setSubMenuHeight(0);
		setAccountSubMenuHeight(0);
		document.body.classList.add('disableInteractions');
	};
	const activeComponent3 = () => {
		setActiveComponent('ChangeNickname');
		setSubMenuHeight(0);
		setAccountSubMenuHeight(0);
		document.body.classList.add('disableInteractions');
	};
	const activeComponent4 = () => {
		setActiveComponent('ChangeAvatar');
		setSubMenuHeight(0);
		setAccountSubMenuHeight(0);
		document.body.classList.add('disableInteractions');
	};
	const activeComponent5 = () => {
		setActiveComponent('DeleteAccount');
		setSubMenuHeight(0);
		setAccountSubMenuHeight(0);
		document.body.classList.add('disableInteractions');
	};
	const activeComponent6 = () => {
		setActiveComponent('Notifications');
		setSubMenuHeight(0);
		setAccountSubMenuHeight(0);
		document.body.classList.add('disableInteractions');
	};
	const activeComponent7 = () => {
		setActiveComponent('AboutUs');
		setSubMenuHeight(0);
		setAccountSubMenuHeight(0);
		document.body.classList.add('disableInteractions');
	};
	const activeComponent8 = () => {
		setActiveComponent('ReportBug');
		setSubMenuHeight(0);
		setAccountSubMenuHeight(0);
		document.body.classList.add('disableInteractions');
	};
	const activeComponent9 = () => {
		setActiveComponent('LogOut');
		setSubMenuHeight(0);
		setAccountSubMenuHeight(0);
		document.body.classList.add('disableInteractions');
	};

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
				<ReportBug onShow={() => showComponent('ReportBug')} resetComponent={resetComponent} />
			)}
			{activeComponent === 'Notifications' && (
				<Notifications
					onShow={() => showComponent('Notifications')}
					resetComponent={resetComponent}
				/>
			)}
			<Wrapper>
				<UlList>
					<LiElement ref={subMenuRef}>
						<BtnElement onClick={subMenuHeightHandler}>
							<Hamburger></Hamburger>
							<span style={{ marginInline: '0.5rem' }}>Menu</span>
							<DropdownIcon />
						</BtnElement>
						<SubMenu $height={subMenuHeight}>
							<ul style={{ listStyle: 'none' }}>
								<li>
									<SubMenuBtn onClick={toHome}>
										<span>Home</span>
									</SubMenuBtn>
								</li>
								<li>
									<SubMenuBtn onClick={activeComponent6}>
										<span>Notfication</span>
									</SubMenuBtn>
								</li>
								<li>
									<SubMenuBtn onClick={activeComponent7}>
										<span>About me</span>
									</SubMenuBtn>
								</li>
								<li>
									<SubMenuBtn onClick={activeComponent8}>
										<span>Report bug</span>
									</SubMenuBtn>
								</li>
								<li>
									<SubMenuBtn
										style={{ borderBottomRightRadius: '20px', borderBottom: 'none' }}
										onClick={activeComponent9}>
										<span>Logout</span>
									</SubMenuBtn>
								</li>
							</ul>
						</SubMenu>
					</LiElement>
					<LiElement ref={accountMenuRef}>
						<BtnElement onClick={subAccountMenuHeightHandler}>
							<Account></Account>
							<span style={{ marginInline: '0.5rem' }}>Account</span>
							<DropdownIcon />
						</BtnElement>
						<AccountSubMenu $height={accountSubMenuHeight}>
							<ul style={{ listStyle: 'none' }}>
								<li>
									<AccountSubMenuBtn onClick={activeComponent1}>
										<span>Change Password</span>
									</AccountSubMenuBtn>
								</li>
								<li>
									<AccountSubMenuBtn onClick={activeComponent2}>
										<span>Change Email</span>
									</AccountSubMenuBtn>
								</li>
								<li>
									<AccountSubMenuBtn onClick={activeComponent3}>
										<span style={{ whiteSpace: 'nowrap' }}>Change Nickname</span>
									</AccountSubMenuBtn>
								</li>
								<li>
									<AccountSubMenuBtn onClick={activeComponent4}>
										<span>Change Avatar</span>
									</AccountSubMenuBtn>
								</li>
								<li>
									<AccountSubMenuBtn
										onClick={activeComponent5}
										style={{ borderBottom: 'none', borderRadius: '0px 0px 20px 20px' }}>
										<span>Delete Account</span>
									</AccountSubMenuBtn>
								</li>
							</ul>
						</AccountSubMenu>
					</LiElement>
					<LiElement>
						<BtnElement onClick={toLeaderboard}>
							<Leaderboard></Leaderboard>
							<span style={{ marginLeft: '0.5rem' }}>Leaderboards</span>
						</BtnElement>
					</LiElement>
					<LiElement>
						<BtnElement style={{ borderRadius: ' 0 10px 10px 0' }} onClick={toBooks}>
							<AllBooksIcon></AllBooksIcon>
							<span style={{ marginLeft: '0.5rem', whiteSpace: 'nowrap' }}>All books</span>
						</BtnElement>
					</LiElement>
				</UlList>
			</Wrapper>
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
Notifications.propTypes = {
	resetComponent: PropTypes.func,
};
export default PcMenu;
