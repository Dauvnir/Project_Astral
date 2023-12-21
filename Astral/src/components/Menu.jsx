import styled from 'styled-components';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdManageAccounts } from 'react-icons/md';
import { IoAdd } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import { IoHeartSharp } from 'react-icons/io5';
const MenuStyled = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	z-index: 3;
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
	z-index: 4;
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

const LogOut = styled(MdLogout)`
	display: inline-block;
	height: 100%;
	width: 100%;
	color: #d9d9d9;
`;
const Menu = () => {
	return (
		<>
			<MenuStyled>
				<WrapperIconLeft>
					<Hamburger />
				</WrapperIconLeft>
				<WrapperIcon style={{ width: '33%', paddingRight: '3.5rem' }}>
					<Account></Account>
				</WrapperIcon>

				<WrapperIconCircle>
					<Add></Add>
				</WrapperIconCircle>

				<WrapperIcon style={{ width: '33%', paddingLeft: '3.5rem' }}>
					<Favorite></Favorite>
				</WrapperIcon>
				<WrapperIconRight>
					<LogOut></LogOut>
				</WrapperIconRight>
			</MenuStyled>
		</>
	);
};

export default Menu;
