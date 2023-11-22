import {StyledBtn} from './styled_components/Button/StyledBtn';
import {StyledText} from './styled_components/Button/StyledText';
import {StyledWrapperBtn} from './styled_components/Button/StyledWrapperBtn';

const LibraryBtn = () => {
	return (
		<StyledWrapperBtn>
			<StyledBtn>
				<StyledText>CREATE YOUR OWN LIBRARY</StyledText>
			</StyledBtn>
		</StyledWrapperBtn>
	);
};

export default LibraryBtn;
