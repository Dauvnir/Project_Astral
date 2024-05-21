import { Paragraph } from "./Paragraph";
import { useState } from "react";
import { WindowTemplateStyling } from "./WindowTemplateStyling";
import PropTypes from "prop-types";
import { WrapperFlex } from "./WrapperFlex";
import styled from "styled-components";
import { StyledBtn } from "./Btn";

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
const AboutUs = ({ clearComponents }) => {
	const [manageState, setManageState] = useState(true);
	const handler = () => {
		setManageState((prev) => !prev);
		clearComponents();
	};
	return (
		<>
			{manageState ? (
				<WindowTemplateStyling style={{ transform: "translate(-50%, -50%)" }}>
					<Paragraph
						$fontSize="2rem"
						$fontWeight="500"
						$margin="0 auto 1rem auto">
						About Us
					</Paragraph>
					<WrapperFlex>
						<Paragraph
							style={{ width: "70%" }}
							$fontSize="1.125rem"
							$fontWeight="500"
							$margin="0 auto 1rem auto">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
							vel condimentum nisi. Cras sollicitudin orci tempus consequat
							pretium. Fusce erat magna, mollis imperdiet odio eu, vestibulum
							rutrum ipsum.
						</Paragraph>
						<Image
							src={
								"https://img.asuracomics.com/unsafe/fit-in/720x936/https://asuratoon.com/wp-content/uploads/2022/09/EstateDevCover01.png"
							}></Image>
					</WrapperFlex>
					<WrapperFlex $overflow="visible" $margin="1rem  0">
						<StyledBtn $width="45%" $margin="auto" onClick={handler}>
							<Paragraph $fontSize="1.5rem" $fontWeight="600">
								BACK
							</Paragraph>
						</StyledBtn>
						<StyledBtn $width="45%" $margin="auto">
							<Paragraph $fontSize="1.5rem" $fontWeight="600">
								CONFIRM
							</Paragraph>
						</StyledBtn>
					</WrapperFlex>
				</WindowTemplateStyling>
			) : null}
		</>
	);
};
AboutUs.propTypes = {
	clearComponents: PropTypes.func,
};
export default AboutUs;
