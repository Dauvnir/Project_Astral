import WelcomePage from "./pages/WelcomePage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./pages/LoginForm";
import LoginLayout from "./pages/LoginLayout";
import SignUpPage from "./pages/SignUpPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import Library from "./pages/Library";
import AllBooks from "./pages/AllBooks";
import Leaderboard from "./pages/ Leaderboard";
import { Dexie } from "dexie";
import axios from "axios";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { useEffect } from "react";

const db = new Dexie("manhwa_list");
db.version(1).stores({
	manhwas: "++id, manhwa_id, srcimg",
});
const { manhwas } = db;

const App = () => {
	const allItems = useLiveQuery(() => manhwas.toArray(), []);
	const [manhwasListAll, setManhwasListAll] = useState([]);
	const [dataAdded, setDataAdded] = useState(false);
	const [dataFetched, setDataFetched] = useState(false);

	useEffect(() => {
		if (!allItems || allItems.length === 0) {
			axios
				.get("http://localhost:3000/manhwas/images")
				.then((response) => {
					setManhwasListAll(response.data);
					console.log("Data fetched");
					setDataFetched(true);
				})
				.catch((error) => {
					console.error("Error fetching data", error);
				});
		}
	}, [allItems]);

	useEffect(() => {
		if (dataFetched && !dataAdded && allItems && allItems.length === 0) {
			const addImages = async () => {
				try {
					await Promise.all(
						manhwasListAll.map(async ({ manhwa_id, srcimg }) => {
							await manhwas.add({
								manhwa_id: manhwa_id,
								srcimg: srcimg,
							});
						})
					);
					console.log("Images added successfully.");
					setDataAdded(true);
				} catch (error) {
					console.error("Error adding images to the database:", error);
				}
			};
			addImages();
		} else {
			console.log("Database entries exist ");
		}
	}, [allItems, manhwasListAll, dataAdded, dataFetched]);

	return (
		<Routes scrollRestoration="manual">
			<Route path="/" element={<WelcomePage />} />
			<Route path="/login" element={<LoginLayout />}>
				<Route index element={<LoginPage />} />
				<Route path="logIn">
					<Route index element={<LoginForm />} />
					<Route path="forgottenPswd">
						<Route index element={<ForgotPassword />} />
						<Route path="succes" element={<ResetPassword />}></Route>
					</Route>
				</Route>
				<Route path="signUp">
					<Route index element={<SignUpPage />} />
					<Route path="registerSucces" element={<RegistrationSuccess />} />
				</Route>
			</Route>
			<Route path="/library">
				<Route index element={<Library />} />
				<Route path="allBooks" element={<AllBooks />} />
				<Route path="leaderboard" element={<Leaderboard />} />
			</Route>
		</Routes>
	);
};

export default App;
