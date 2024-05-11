/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { PacmanLoader } from "react-spinners";
import MainBackground from "./MainBackground";
import styled from "styled-components";
import { WrapperFlex } from "./WrapperFlex";
import StyledLogo from "./LogoHeader";
const WrapperMain = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
`;
const Wrapper = styled.div`
	display: flex;
	position: relative;
	z-index: 3;
	align-items: center;
	justify-content: left;
	width: 100%;
	height: 100%;
`;
const PersistentLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const { auth, persist } = useAuth();

	useEffect(() => {
		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};
		!auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
	}, []);

	return (
		<>
			{!persist ? (
				<Outlet />
			) : isLoading ? (
				<>
					<MainBackground></MainBackground>
					<WrapperMain>
						<WrapperFlex
							$margin=" 1rem auto 2rem auto"
							style={{ overflow: "visible", cursor: "pointer" }}
							$width="clamp(10rem, 95%, 50rem)">
							<StyledLogo />
						</WrapperFlex>
						<Wrapper>
							<PacmanLoader
								color="#d9d9d9"
								size={100}
								cssOverride={{
									opacity: 1,
								}}
							/>
						</Wrapper>
					</WrapperMain>
				</>
			) : (
				<Outlet />
			)}
		</>
	);
};

export default PersistentLogin;
