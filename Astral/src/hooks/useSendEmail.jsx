import axios from "../api/axios";

const useSendEmail = () => {
	const sendEmail = async (email, topic, message) => {
		try {
			await axios.post("/email", { email, topic, message });
		} catch (error) {
			console.error("Error while sending email", error);
		}
	};

	return sendEmail;
};

export default useSendEmail;
