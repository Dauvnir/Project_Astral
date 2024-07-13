import styled from "styled-components";
import { Paragraph } from "./Paragraph";
import { WrapperFlex } from "./WrapperFlex";
const Wrap = styled.div`
	background-color: rgba(29, 37, 53, 0.7);
	position: relative;
	z-index: 2;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 2rem;
	width: clamp(25rem, 90vw + 1rem, 50rem);
	margin: 1rem;
	border-radius: 20px;
	box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.56);
	@media (min-width: 1200px) {
		width: clamp(35rem, 45vw + 1rem, 50rem);
	}
`;
const Header = styled.p`
	color: #e5e9f1;
	font-family: Lato;
	font-size: 1.625rem;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	width: 100%;
	height: 20%;
	z-index: 2;
	text-align: center;
	margin-bottom: 2rem;
	@media only screen and (min-width: 550px) {
		font-size: 1.8rem;
	}
`;

const ResponsiveParagraph = styled(Paragraph)`
	font-size: clamp(1rem, 1vw + 1rem, 1.5rem);
	text-align: left;
`;
const AboutUs = () => {
	return (
		<Wrap>
			<Header>Project Astral: A Fair and Ethical Online Library</Header>
			<WrapperFlex>
				<ResponsiveParagraph>
					Hi, my name is Patrick. I am an aspiring frontend React developer from
					Poland. I love comics, books, and board games.
					<br />
					<br />
					This project was created to provide me with an opportunity to work as
					a software engineer and to earn my bachelor`s degree. It is a
					full-stack application, meaning I worked on both the frontend (visual
					part) and the backend (server and database). Without any help, it took
					me about 7 months of consistent work, dedicating 3 hours every day.
					<br />
					<br />
					In short, this project can be described as an online library that does
					not steal translations but merely tracks them. I do not like websites
					that copy paid work by community translators, so here is my solution:
					a tracking library - Project Astral.
				</ResponsiveParagraph>
			</WrapperFlex>
		</Wrap>
	);
};

export default AboutUs;
