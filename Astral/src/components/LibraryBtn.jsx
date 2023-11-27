import {WrapperFlex} from './WrapperFlex';
import {StyledBtn} from './Btn';
import {StyledText} from './StyledTextForBtn';

const LibraryBtn = () => {
	return (
		<WrapperFlex height={'5.15rem'} style={{marginTop: '3rem'}}>
			<StyledBtn>
				<StyledText>CREATE YOUR OWN LIBRARY</StyledText>
			</StyledBtn>
		</WrapperFlex>
	);
};

export default LibraryBtn;
