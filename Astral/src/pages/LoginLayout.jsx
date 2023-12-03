import MainBackground from '../components/MainBackground';
import StyledLogo from '../components/LogoHeader';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { StyledText } from '../components/StyledTextForBtn';
import { StyledBtn } from '../components/Btn';
import { WrapperFlex } from '../components/WrapperFlex';
import styled from 'styled-components';
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
	height: 100%;
`;
const LoginLayout = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { pathname } = location;
	console.log(pathname);
	return (
		<>
			<MainBackground></MainBackground>
			<WrapperMain>
				<WrapperFlex $margin=' 0 0 2rem 0' style={{ overflow: 'visible' }}>
					<StyledLogo></StyledLogo>
				</WrapperFlex>
				<Wrapper>
					<Outlet />
					<WrapperFlex $height='20%' style={{ alignItems: 'end' }}>
						<StyledBtn
							$margin='0 0 1.5rem 0'
							onClick={() => (pathname != '/login' ? navigate('/login') : navigate('/'))}>
							<StyledText>BACK</StyledText>
						</StyledBtn>
					</WrapperFlex>
				</Wrapper>
			</WrapperMain>
		</>
	);
};

export default LoginLayout;
