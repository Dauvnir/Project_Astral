import styled from 'styled-components';
import {BackgroundWrapper} from './BackgroundWrapper';
import {Paragraph} from './Paragraph';
import {WrapperFlex} from './WrapperFlex';
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

const Image = styled.img`
	position: relative;
	z-index: 2;
	width: 7rem;
	height: 11rem;
	border-radius: 0.3125rem;
	border: 2px solid #000;
	box-shadow: 0px 4px 4px 1px rgba(0, 0, 0, 0.56);
	object-fit: cover;
`;

const AboutUs = () => {
	return (
		<BackgroundWrapper>
			<Header>About this project</Header>
			<WrapperFlex height={'80%'} $gap={'1rem'} overflow={'visible'}>
				<Paragraph fontSize={'1.125rem'} $textAlign={'left'}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel condimentum nisi.
					Cras sollicitudin orci tempus consequat pretium. Fusce erat magna, mollis imperdiet odio
					eu, vestibulum rutrum ipsum.
				</Paragraph>
				<Image
					src={
						'https://img.asuracomics.com/unsafe/fit-in/720x936/https://asuratoon.com/wp-content/uploads/2022/09/EstateDevCover01.png'
					}></Image>
			</WrapperFlex>
		</BackgroundWrapper>
	);
};

export default AboutUs;
