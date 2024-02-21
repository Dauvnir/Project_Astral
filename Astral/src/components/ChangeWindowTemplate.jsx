import { useState } from 'react';
import { StyledBtn } from './Btn';
import { Paragraph } from './Paragraph';
import { WrapperFlex } from './WrapperFlex';
import PropTypes from 'prop-types';

const ChangeWindowTemplate = ({ closeHandler }) => {
	// eslint-disable-next-line no-unused-vars
	const [closeState, setCloseState] = useState(true);
	const closeStateHandle = () => {
		setCloseState((prevCloseState) => {
			// Use the previous state to ensure you're working with the latest value
			closeHandler(!prevCloseState); // Pass the updated value to closeHandler
			return !prevCloseState; // Return the new state value
		});
	};
	return (
		<>
			<WrapperFlex $overflow='visible' $margin='1rem  0'>
				<StyledBtn $width='40%' $margin='0 1rem 0 auto' onClick={closeStateHandle}>
					<Paragraph $fontSize='1.5rem' $fontWeight='600'>
						BACK
					</Paragraph>
				</StyledBtn>
				<StyledBtn $width='40%' $margin='0 auto 0 1rem'>
					<Paragraph $fontSize='1.5rem' $fontWeight='600'>
						CONFIRM
					</Paragraph>
				</StyledBtn>
			</WrapperFlex>
		</>
	);
};
ChangeWindowTemplate.propTypes = {
	closeHandler: PropTypes.func.isRequired,
};
export default ChangeWindowTemplate;
