import MainBackground from "./MainBackground";
import StyledLogo from "./LogoHeader";
import { Outlet } from "react-router-dom";
import { WrapperFlex } from "./WrapperFlex";
import styled from "styled-components";

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
const LoginLayout = () => {
	return (
		<>
			<MainBackground></MainBackground>
			<div className="overlay"></div>
			<WrapperMain>
				<WrapperFlex
					$margin=" 1rem auto 2rem auto"
					style={{ overflow: "visible", cursor: "pointer" }}
					$width="clamp(10rem, 95%, 50rem)">
					<StyledLogo></StyledLogo>
				</WrapperFlex>
				<Wrapper>
					<Outlet />
				</Wrapper>
			</WrapperMain>
		</>
	);
};

export default LoginLayout;
