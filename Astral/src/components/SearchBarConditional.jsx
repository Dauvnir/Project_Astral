import styled from 'styled-components';
import { IoSearchOutline } from 'react-icons/io5';
import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

const StyledInput = styled.input`
	width: 100%;
	height: 2.5rem;
	z-index: 2;
	margin-right: 2rem;
	background: none;
	border: none;
	border-bottom: 1px solid #afbfd5;
	caret-color: #d9d9d9;
	outline: none;
	font-size: 1.25rem;
	color: #d9d9d9;
`;
const SearchSvg = styled(IoSearchOutline)`
	color: #d9d9d9;
	margin-left: -3rem;
	margin-block: auto;
	width: 1.25rem;
	height: 1.25rem;
	transition: opacity 0.2s ease;
`;

const SearchBarConditional = forwardRef(({ hideElements }, ref) => {
	const [isInputFocused, setIsInputFocused] = useState(false);
	return (
		<div
			ref={ref}
			style={{ margin: 'auto', display: !hideElements ? 'flex' : 'none', width: '80%' }}>
			<StyledInput
				type='text'
				placeholder='Search for a series'
				onFocus={() => setIsInputFocused(true)}
				onBlur={() => setIsInputFocused(false)}
				style={{ marginRight: !hideElements ? '0rem' : '-2rem' }}
			/>
			<SearchSvg
				style={{ opacity: isInputFocused ? 0 : 1, marginLeft: !hideElements ? '-1rem' : '-3rem' }}
			/>
		</div>
	);
});
SearchBarConditional.displayName = 'SearchBarConditional';
SearchBarConditional.propTypes = {
	hideElements: PropTypes.bool.isRequired,
};
export default SearchBarConditional;
