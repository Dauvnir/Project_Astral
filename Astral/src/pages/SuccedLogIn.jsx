import { Paragraph } from "../components/Paragraph";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import { initializeDatabase } from "../api/DatabaseLocal";
import { Navigate } from "react-router-dom";
const Wrap = styled.div`
	background-color: rgba(29, 37, 53, 0.7);
	position: relative;
	z-index: 2;
	width: clamp(15rem, 85% + 1rem, 25rem);
	min-height: 15rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 2rem 1rem;
	border-radius: 20px;
	box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.56);
`;

const SuccededLogIn = () => {
	const [isInitializing, setIsInitializing] = useState(true);
	useEffect(() => {
		async function fetchData() {
			try {
				await initializeDatabase();
				setTimeout(() => {
					setIsInitializing(false);
				}, 1000);
			} catch (error) {
				console.error("Error initializing database:", error);
			}
		}
		fetchData();
	}, []);
	return (
		<>
			{isInitializing ? (
				<Wrap>
					<Paragraph $fontSize="1.5rem" $fontWeight="600">
						You are logged in!
						<br />
						Database is populating with books.
						<br />
						You will be redirected to your library shortly.
					</Paragraph>
				</Wrap>
			) : (
				<Navigate to={"/library"} replace={true} />
			)}
		</>
	);
};

export default SuccededLogIn;
