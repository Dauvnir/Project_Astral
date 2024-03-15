import styled from "styled-components";

export const WindowTemplateStyling = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	position: absolute;
	z-index: 5;
	width: clamp(15rem, 90%, 30rem);
	height: auto;
	margin: 0 auto;
	background-color: rgba(29, 37, 53, 1);
	left: 50%;
	bottom: 0;
	transform: translate(-50%, -30%);
	border-radius: 10%;
	padding: 1rem;
	box-shadow: rgba(0, 0, 0, 0.56) 0px 0px 10px 4px;
	pointer-events: auto;
`;
