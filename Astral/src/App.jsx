import WelcomePage from "./pages/WelcomePage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./pages/LoginForm";
import LoginLayout from "./components/LoginLayout";
import SignUpPage from "./pages/SignUpPage";
import Library from "./pages/Library";
import AllBooks from "./pages/AllBooks";
import Leaderboard from "./pages/ Leaderboard";

const App = () => {
	return (
		<Routes scrollRestoration="manual">
			<Route path="/" element={<WelcomePage />} />
			<Route path="/login" element={<LoginLayout />}>
				<Route index element={<LoginPage />} />
				<Route path="signIn">
					<Route index element={<LoginForm />} />
				</Route>
				<Route path="signUp">
					<Route index element={<SignUpPage />} />
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
