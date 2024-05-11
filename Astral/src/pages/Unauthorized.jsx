import { useNavigate } from "react-router-dom";
import { BackgroundWrapper } from "../components/BackgroundWrapper";
import { Paragraph } from "../components/Paragraph";
import { StyledBtn } from "../components/Btn";
import { StyledText } from "../components/StyledTextForBtn";

const Unauthorized = () => {
	const navigate = useNavigate();
	const goBack = () => navigate(-1);
	return (
		<>
			<section
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}>
				<BackgroundWrapper>
					<Paragraph $fontSize="1.5rem" $fontWeight="600">
						Unauthorized access.
					</Paragraph>
					<StyledBtn onClick={goBack}>
						<StyledText>Go Back</StyledText>
					</StyledBtn>
				</BackgroundWrapper>
			</section>
		</>
	);
};

export default Unauthorized;
