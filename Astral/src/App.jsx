import WelcomePage from './pages/WelcomePage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LoginForm from './pages/LoginForm';
import LoginLayout from './pages/LoginLayout';
import SignUpPage from './pages/SignUpPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import RegistrationSuccess from './pages/RegistrationSuccess';
import Library from './pages/Library';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<WelcomePage />} />
			<Route path='/login' element={<LoginLayout />}>
				<Route index element={<LoginPage />} />
				<Route path='logIn'>
					<Route index element={<LoginForm />} />
					<Route path='forgottenPswd'>
						<Route index element={<ForgotPassword />} />
						<Route path='succes' element={<ResetPassword />}></Route>
					</Route>
				</Route>
				<Route path='signUp'>
					<Route index element={<SignUpPage />} />
					<Route path='registerSucces' element={<RegistrationSuccess />} />
				</Route>
			</Route>
			<Route path='/library' element={<Library />} />
		</Routes>
	);
};

export default App;
