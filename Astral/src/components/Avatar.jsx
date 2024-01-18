import styled from 'styled-components';
import { WrapperFlex } from './WrapperFlex';
const AvatarWrapper = styled.div`
	display: flex;
	height: 100%;
	width: clamp(15rem, 35%, 20rem);
	border-radius: 10px;
	cursor: pointer;
`;
const AvatarNickname = styled.p`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 70%;
	height: 100%;
	background: rgba(55, 79, 108, 0.5);
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
	&:hover {
		filter: blur(2px);
		transition: filter 0.5s;
	}
`;

const Avatar = () => {
	return (
		<>
			<WrapperFlex
				$margin='1.5rem 0rem rem 0rem'
				$justifyContent='right'
				style={{ height: '5rem' }}>
				<AvatarWrapper>
					<AvatarNickname>ALA_MA_kurwa_KOta</AvatarNickname>
					<AvatarImage></AvatarImage>
				</AvatarWrapper>
			</WrapperFlex>
		</>
	);
};

export default Avatar;
