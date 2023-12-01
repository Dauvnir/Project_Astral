import MainBackground from '../components/MainBackground';
import { StyledBtn } from '../components/Btn';
import { BackgroundWrapper } from '../components/BackgroundWrapper';
import StyledLogo from '../components/LogoHeader';
import { StyledText } from '../components/StyledTextForBtn';
import { WrapperFlex } from '../components/WrapperFlex';
import styled from 'styled-components';

const ResponsiveBackgroundWrapper = styled(BackgroundWrapper)`
	height: 40%;
	margin-top: 7rem;
	width: clamp(20rem, 80vw + 1rem, 35rem);
`;
const WrapperMain = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
`;
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 80%;
`;

const LoginPage = () => {
	return (
		<>
			<MainBackground></MainBackground>
			<WrapperMain>
				<WrapperFlex $margin=' 0 0 2rem 0'>
					<StyledLogo></StyledLogo>
				</WrapperFlex>
				<Wrapper>
					<ResponsiveBackgroundWrapper $flexDirection='row'>
						<WrapperFlex $margin='0 0 1rem 0'>
							<StyledBtn
								$width='45%'
								$margin='0 1rem 0 0'>
								<StyledText>Login</StyledText>
							</StyledBtn>
							<StyledBtn $width='45%'>
								<StyledText>Sign Up</StyledText>
							</StyledBtn>
						</WrapperFlex>
						<WrapperFlex $justifyContent='center'>
							<StyledBtn $width='45%'>
								<StyledText>Guest</StyledText>
							</StyledBtn>
						</WrapperFlex>
					</ResponsiveBackgroundWrapper>
					<WrapperFlex
						$height='20%'
						style={{ alignItems: 'end' }}>
						<StyledBtn $margin='0 0 1.5rem 0'>
							<StyledText>BACK</StyledText>
						</StyledBtn>
					</WrapperFlex>
				</Wrapper>
			</WrapperMain>
		</>
	);
};

export default LoginPage;
