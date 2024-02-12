import MainBackground from '../components/MainBackground';
import StyledLogo from '../components/LogoHeader';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
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
	const location = useLocation();
	const { pathname } = location;
	let navigate = useNavigate();
	const toWelcomePage = () => {
		let path = `/`;
		navigate(path);
	};
	return (
		<>
			<MainBackground></MainBackground>
			<WrapperMain>
				<WrapperFlex
					$margin=' 0 0 2rem 0'
					style={{ overflow: 'visible', cursor: 'pointer' }}
					onClick={toWelcomePage}>
					<StyledLogo></StyledLogo>
				</WrapperFlex>
				<Wrapper>
					<Outlet />
					{pathname == '/login/logIn/forgottenPswd/succes' ||
					pathname == '/login/signUp/registerSucces' ? null : (
						<WrapperFlex $overflow='visible' $height='20%' style={{ alignItems: 'end' }}>
							<Link to={pathname != '/login' ? '/login' : '/'}>
								<StyledBtn $margin='0 0 1.5rem 0'>
									<StyledText>BACK</StyledText>
								</StyledBtn>
							</Link>
						</WrapperFlex>
					)}
				</Wrapper>
			</WrapperMain>
		</>
	);
};

export default LoginLayout;
