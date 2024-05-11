import { useEffect } from "react";
import { useState } from "react";
import { initializeDatabase } from "../api/DatabaseLocal";
import styled from "styled-components";
import PacmanLoader from "react-spinners/PacmanLoader";
const Overlay = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	z-index: 11;
`;
const MsgWindow = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 15rem;
	height: 15rem;
	background-color: rgba(29, 37, 53, 1);
	border-radius: 10px;
	margin: auto;
	z-index: 12;
	border: 1px solid #d9d9d9;
`;
const Header = styled.p`
	width: 100%;
	height: 20%;
	text-align: center;
	color: #d9d9d9;
	padding: 1rem;
	font-family: Lato;
	font-weight: 600;
`;
const Body = styled.div`
	display: flex;
	width: 100%;
	height: 80%;
	justify-content: left;
	align-items: center;
	padding: 1rem;
`;
const PopulatingDatabase = () => {
	const [isInitializing, setIsInitializing] = useState(true);
	useEffect(() => {
		async function fetchData() {
			try {
				await initializeDatabase();
				setIsInitializing(false);
			} catch (error) {
				console.error("Error initializing database:", error);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (isInitializing) {
			document.body.classList.add("overlay-visible");
		} else {
			document.body.classList.remove("overlay-visible");
		}
	}, [isInitializing]);
	return (
		<>
			{isInitializing ? (
				<>
					<Overlay>
						<MsgWindow>
							<Header>One time only downloading books...</Header>
							<Body>
								<PacmanLoader
									color="#d9d9d9"
									size={45}
									cssOverride={{
										opacity: 1,
									}}
								/>
							</Body>
						</MsgWindow>
					</Overlay>
				</>
			) : null}
		</>
	);
};

export default PopulatingDatabase;
