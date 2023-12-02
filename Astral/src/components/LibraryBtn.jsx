import { WrapperFlex } from './WrapperFlex';
import { StyledBtn } from './Btn';
import { StyledText } from './StyledTextForBtn';
import { useNavigate } from 'react-router-dom';

const LibraryBtn = () => {
	const navigate = useNavigate();
	return (
		<WrapperFlex
			$height='5.15rem'
			$margin='3rem 0 0 0 '>
			<StyledBtn onClick={() => navigate('/login')}>
				<StyledText style={{ padding: '0' }}>CREATE YOUR OWN LIBRARY</StyledText>
			</StyledBtn>
		</WrapperFlex>
	);
};

export default LibraryBtn;
