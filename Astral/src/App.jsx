import WelcomePage from "./pages/WelcomePage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./pages/LoginForm";
import LoginLayout from "./components/LoginLayout";
import SignUpPage from "./pages/SignUpPage";
import Library from "./pages/Library";
import AllBooks from "./pages/AllBooks";
import Leaderboard from "./pages/ Leaderboard";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import SuccededLogIn from "./pages/SuccedLogIn";
import PersistentLogin from "./components/PersistentLogin";
import UpdateDatabase from "./components/UpdateDatabase";
import AddLibrary from "./components/AddLibrary";
import { RandomImageProvider } from "./context/RandomImageProvider.jsx";
import MainPage from "./pages/MainPage.jsx";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* public routes*/}
				<Route path="welcome" element={<WelcomePage />} />
				<Route path="form" element={<LoginLayout />}>
					<Route index element={<LoginPage />} />
					<Route path="login" element={<LoginForm />} />
					<Route path="register" element={<SignUpPage />} />
				</Route>

				{/* Protected routes for users*/}
				<Route element={<PersistentLogin />}>
					<Route element={<RequireAuth allowedRoles={[7213]} />}>
						<Route element={<AddLibrary />}>
							<Route path="/" element={<LoginLayout />}>
								<Route index element={<SuccededLogIn />} />
							</Route>
						</Route>
						<Route element={<UpdateDatabase />}>
							<Route element={<RandomImageProvider />}>
								<Route path="/" element={<MainPage />}>
									<Route path="library" element={<Library />} />
									<Route path="books" element={<AllBooks />} />
									<Route path="leaderboard" element={<Leaderboard />} />
								</Route>
							</Route>
						</Route>
					</Route>
				</Route>

				{/* */}
				<Route path="unauthorized" element={<LoginLayout />}>
					<Route index element={<Unauthorized />} />
				</Route>
				<Route path="*" element={<ErrorPage />} />
			</Route>
		</Routes>
	);
};

export default App;
