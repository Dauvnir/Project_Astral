import styled from 'styled-components';
import { IoSearchOutline } from 'react-icons/io5';
import { useState } from 'react';

const StyledInput = styled.input`
	width: 13.5rem;
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
	margin-bottom: -0.25rem;
	width: 1.25rem;
	height: 1.25rem;
	transition: opacity 0.2s ease;
`;
const SearchBar = () => {
	const [isInputFocused, setIsInputFocused] = useState(false);
	return (
		<div>
			<StyledInput
				type='text'
				placeholder='Search for a series'
				onFocus={() => setIsInputFocused(true)}
				onBlur={() => setIsInputFocused(false)}
			/>
			<SearchSvg style={{ opacity: isInputFocused ? 0 : 1 }} />
		</div>
	);
};

export default SearchBar;
