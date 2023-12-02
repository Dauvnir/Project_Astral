import { StyledBtn } from '../components/Btn';
import { BackgroundWrapper } from '../components/BackgroundWrapper';
import { StyledText } from '../components/StyledTextForBtn';
import { WrapperFlex } from '../components/WrapperFlex';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const ResponsiveBackgroundWrapper = styled(BackgroundWrapper)`
	height: 40%;
	margin-top: 7rem;
	width: clamp(20rem, 80vw + 1rem, 35rem);
`;

const LoginPage = () => {
	const navigate = useNavigate();

	return (
		<>
			<ResponsiveBackgroundWrapper $flexDirection='row'>
				<WrapperFlex $margin='0 0 1rem 0'>
					<StyledBtn $width='45%' $margin='0 1rem 0 0' onClick={() => navigate('/login/form')}>
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
		</>
	);
};

export default LoginPage;
