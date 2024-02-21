import styled from 'styled-components';
import { WrapperFlex } from './WrapperFlex';
import PcMenu from './PcMenu';

const AvatarWrapper = styled.div`
	display: flex;
	height: 100%;
	width: clamp(15rem, 35%, 20rem);
	border-radius: 10px;
	box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
`;
const AvatarNickname = styled.p`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	z-index: 3;
	width: 70%;
	height: 100%;
	background: rgba(29, 37, 53, 0.7);
	font-size: 1rem;
	overflow: hidden;
	border-bottom-left-radius: 10px;
	border-top-left-radius: 10px;
	text-align: center;
	color: #e5e9f1;
	font-family: Lato;
	font-size: 1rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;
const AvatarImage = styled.img`
	position: relative;
	z-index: 3;
	width: 30%;
	height: 100%;
	border-bottom-right-radius: 10px;
	border-top-right-radius: 10px;
	background: url('/src/assets/avatar.jpeg') no-repeat center center / cover;
`;
const AdjustedWrapper = styled(WrapperFlex)`
	position: static;
	z-index: 3;
	margin: 3rem 0 3rem -1rem;
	height: 5rem;
	justify-content: right;
	overflow: visible;
	@media (min-width: 1200px) {
		justify-content: space-between;
	}
`;
const Avatar = () => {
	return (
		<>
			<AdjustedWrapper>
				<PcMenu />
				<AvatarWrapper>
					<AvatarNickname>Alicja z kotem</AvatarNickname>
					<AvatarImage></AvatarImage>
				</AvatarWrapper>
			</AdjustedWrapper>
		</>
	);
};

export default Avatar;
