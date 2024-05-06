import { useNavigate } from "react-router-dom";
import { BackgroundWrapper } from "../components/BackgroundWrapper";
import { Paragraph } from "../components/Paragraph";
import { StyledBtn } from "../components/Btn";
import { StyledText } from "../components/StyledTextForBtn";
import styled from "styled-components";
import MainBackground from "../components/MainBackground";
import StyledLogo from "../components/LogoHeader";
import { WrapperFlex } from "../components/WrapperFlex";
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
	justify-content: center;
	width: 100%;
	height: 100%;
`;
export default function ErrorPage() {
	const navigate1 = useNavigate();
	const goBack = () => navigate1(-1);

	const navigate = useNavigate();
	const toWelcomePage = () => {
		let path = `/welcome`;
		navigate(path);
	};

	return (
		<>
			<MainBackground></MainBackground>
			<div className="overlay"></div>
			<WrapperMain>
				<WrapperFlex
					$margin=" 1rem auto 2rem auto"
					style={{ overflow: "visible", cursor: "pointer" }}
					onClick={toWelcomePage}
					$width="clamp(10rem, 95%, 50rem)">
					<StyledLogo />
				</WrapperFlex>
				<Wrapper>
					<section
						style={{
							width: "100%",
							height: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<BackgroundWrapper>
							<Paragraph $fontSize="1.5rem" $fontWeight="600">
								You are not supposed to see this page.
							</Paragraph>
							<StyledBtn onClick={goBack}>
								<StyledText>Go Back</StyledText>
							</StyledBtn>
						</BackgroundWrapper>
					</section>
				</Wrapper>
			</WrapperMain>
		</>
	);
}
