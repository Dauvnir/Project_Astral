import WelcomePage from "./pages/WelcomePage.jsx";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import LoginForm from "./pages/LoginForm.jsx";
import LoginLayout from "./components/LoginLayout.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Library from "./pages/Library.jsx";
import AllBooks from "./pages/AllBooks.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Layout from "./pages/Layout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import SuccededLogIn from "./pages/SuccedLogIn.jsx";
import PersistentLogin from "./components/PersistentLogin.jsx";
import UpdateDatabase from "./components/UpdateDatabase.jsx";
import AddLibrary from "./components/AddLibrary.jsx";
import { RandomImageProvider } from "./context/RandomImageProvider.jsx";
import MainPage from "./pages/MainPage.jsx";
import ResetLink from "./pages/ResetLink.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* public routes*/}
				<Route index element={<WelcomePage />} />
				<Route path="form" element={<LoginLayout />}>
					<Route index element={<LoginPage />} />
					<Route path="login" element={<LoginForm />} />
					<Route path="register" element={<SignUpPage />} />
					<Route path="resetLink" element={<ResetLink />} />
				</Route>
				<Route path="resetPassword/:id/:token" element={<LoginLayout />}>
					<Route index element={<ResetPassword />} />
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
								<Route path="/library" element={<MainPage />}>
									<Route index element={<Library />} />
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
