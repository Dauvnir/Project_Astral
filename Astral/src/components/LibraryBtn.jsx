import { WrapperFlex } from './WrapperFlex';
import { StyledBtn } from './Btn';
import { StyledText } from './StyledTextForBtn';

const LibraryBtn = () => {
	return (
		<WrapperFlex
			$height='5.15rem'
			$margin='3rem 0 0 0 '>
			<StyledBtn>
				<StyledText style={{ padding: '0' }}>CREATE YOUR OWN LIBRARY</StyledText>
			</StyledBtn>
		</WrapperFlex>
	);
};

export default LibraryBtn;
