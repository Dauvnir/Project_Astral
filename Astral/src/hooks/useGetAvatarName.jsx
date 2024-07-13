import useGetNickname from "./useGetNickname";
import useAxiosPrivate from "./useAxiosPrivate";
import { useState } from "react";
import { useEffect } from "react";

const useGetAvatarName = () => {
	const [name, setName] = useState("");
	const nickname = useGetNickname();
	const axiosPrivate = useAxiosPrivate();
	useEffect(() => {
		const getAvatarName = async () => {
			try {
				const response = await axiosPrivate.post(
					"/users/avatar/name",
					{ nickname },
					{
						headers: { "Content-Type": "application/json" },
						withCredentials: true,
					}
				);
				const { avatarName } = response.data; // Assuming response.data has { avatarName }
				setName(avatarName);
			} catch (error) {
				console.error("Error fetching avatar name:", error);
			}
		};

		if (nickname) {
			getAvatarName();
		}
	}, [axiosPrivate, nickname]);

	return name;
};

export default useGetAvatarName;
