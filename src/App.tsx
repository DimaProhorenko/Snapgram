import { Routes, Route } from 'react-router-dom';
import './globals.css';

import SigninForm from '_auth/forms/SigninForm';
import SignupForm from '_auth/forms/SignupForm';
import AuthLayout from '_auth/AuthLayout';
import { Home } from '_root/pages';
import RootLayout from '_root/RootLayout';

const App = () => {
	return (
		<Routes>
			{/* Public routes */}
			<Route element={<AuthLayout />}>
				<Route path='singin' element={<SigninForm />} />
				<Route path='signup' element={<SignupForm />} />
			</Route>

			{/* Private routes */}
			<Route element={<RootLayout />}>
				<Route index element={<Home />} />
			</Route>
		</Routes>
	);
};
export default App;
