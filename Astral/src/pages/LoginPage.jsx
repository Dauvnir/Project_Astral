import { StyledBtn } from '../components/Btn';
import { BackgroundWrapper } from '../components/BackgroundWrapper';
import { StyledText } from '../components/StyledTextForBtn';
import { WrapperFlex } from '../components/WrapperFlex';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const ResponsiveBackgroundWrapper = styled(BackgroundWrapper)`
	height: 40%;
	margin-top: 7rem;
	width: clamp(20rem, 80vw + 1rem, 35rem);
`;

const LoginPage = () => {
	return (
		<>
			<ResponsiveBackgroundWrapper $flexDirection='row'>
				<WrapperFlex $overflow='visible' $margin='0 0 1rem 0'>
					<Link to='/login/logIn'>
						<StyledBtn $margin='0 1rem 0 0'>
							<StyledText>Login</StyledText>
						</StyledBtn>
					</Link>
					<Link to='/login/signUp'>
						<StyledBtn $margin='0 1rem 0 0'>
							<StyledText>Sign Up</StyledText>
						</StyledBtn>
					</Link>
				</WrapperFlex>
				<WrapperFlex $justifyContent='center' $overflow='visible'>
					<StyledBtn $width='45%'>
						<StyledText>Guest</StyledText>
					</StyledBtn>
				</WrapperFlex>
			</ResponsiveBackgroundWrapper>
		</>
	);
};

export default LoginPage;
