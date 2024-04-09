import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import styled from "styled-components";
const StyledInputSearchBar = styled.input`
	width: 100%;
	height: 2.5rem;
	background: none;
	border: none;
	border-bottom: 1px solid #afbfd5;
	caret-color: #d9d9d9;
	outline: none;
	font-size: 1.25rem;
	color: #d9d9d9;
	margin: auto;
`;
const SearchSvg = styled(IoSearchOutline)`
	color: #d9d9d9;
	margin-left: -1.5rem;
	margin-bottom: -0.25rem;
	width: 1.25rem;
	height: 1.25rem;
	transition: opacity 0.2s ease;
`;

const SearchBar = () => {
	const [isInputFocused, setIsInputFocused] = useState(false);
	return (
		<>
			<div style={{ paddingInline: "1rem", marginBlock: "0.5rem" }}>
				<StyledInputSearchBar
					type="text"
					placeholder="Search for a series"
					onFocus={() => setIsInputFocused(true)}
					onBlur={() => setIsInputFocused(false)}
				/>
				<SearchSvg style={{ opacity: isInputFocused ? 0 : 1 }} />
			</div>
		</>
	);
};
export default SearchBar;
