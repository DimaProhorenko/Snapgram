import { Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import './globals.css';

import SigninForm from '@/_auth/forms/SigninForm';
import SignupForm from '@/_auth/forms/SignupForm';
import AuthLayout from '@/_auth/AuthLayout';
import { AllUsers, CreatePost, Explore, Home, Saved } from '@/_root/pages';
import RootLayout from '@/_root/RootLayout';
import {
	ALL_USERS,
	CREATE_POST,
	EXPLORE,
	SAVED,
	SIGNIN,
	SIGNUP,
} from './constants/routes';

const App = () => {
	return (
		<>
			<Routes>
				{/* Public routes */}
				<Route element={<AuthLayout />}>
					<Route path={SIGNIN} element={<SigninForm />} />
					<Route path={SIGNUP} element={<SignupForm />} />
				</Route>

				{/* Private routes */}
				<Route element={<RootLayout />}>
					<Route index element={<Home />} />
					<Route path={EXPLORE} element={<Explore />} />
					<Route path={ALL_USERS} element={<AllUsers />} />
					<Route path={SAVED} element={<Saved />} />
					<Route path={CREATE_POST} element={<CreatePost />} />
				</Route>
			</Routes>
			<Toaster />
		</>
	);
};
export default App;
