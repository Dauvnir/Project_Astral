import WelcomePage from './pages/WelcomePage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LoginForm from './pages/LoginForm';
import LoginLayout from './pages/LoginLayout';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<WelcomePage />} />
			<Route path='/login' element={<LoginLayout />}>
				<Route index element={<LoginPage />} />
				<Route path='/login/form' element={<LoginForm />} />
			</Route>
		</Routes>
	);
};

export default App;
