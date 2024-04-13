import { StyledBtn } from "../components/Btn";
import { BackgroundWrapper } from "../components/BackgroundWrapper";
import { StyledText } from "../components/StyledTextForBtn";
import { WrapperFlex } from "../components/WrapperFlex";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ResponsiveBackgroundWrapper = styled(BackgroundWrapper)`
	height: 40%;
	width: clamp(20rem, 80vw + 1rem, 35rem);
	position: sticky;
	margin-inline: auto;
	top: 50%;
	transform: translateY(-50%);
`;
const CenteredStyledText = styled(StyledText)`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center; /* Center vertically */
	justify-content: center; /* Center horizontally */
`;
const LoginPage = () => {
	return (
		<>
			<ResponsiveBackgroundWrapper $flexDirection="row">
				<WrapperFlex $overflow="visible" $margin="0 0 1rem 0">
					<StyledBtn $margin="0 1rem 0  0 ">
						<Link to="/login/logIn" style={{ textDecoration: "none" }}>
							<CenteredStyledText>Login</CenteredStyledText>
						</Link>
					</StyledBtn>
					<StyledBtn>
						<Link to="/login/signUp" style={{ textDecoration: "none" }}>
							<CenteredStyledText>Sign Up</CenteredStyledText>
						</Link>
					</StyledBtn>
				</WrapperFlex>
				<WrapperFlex $justifyContent="center" $overflow="visible">
					<Link to="/library">
						<StyledBtn>
							<StyledText>Guest</StyledText>
						</StyledBtn>
					</Link>
				</WrapperFlex>
			</ResponsiveBackgroundWrapper>
		</>
	);
};

export default LoginPage;
