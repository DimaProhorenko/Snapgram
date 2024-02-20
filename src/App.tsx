import { Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import './globals.css';

import SigninForm from '@/_auth/forms/SigninForm';
import SignupForm from '@/_auth/forms/SignupForm';
import AuthLayout from '@/_auth/AuthLayout';
import {
	AllUsers,
	CreatePost,
	Explore,
	Home,
	Post,
	Profile,
	Saved,
	UpdatePost,
	UpdateProfile,
} from '@/_root/pages';
import RootLayout from '@/_root/RootLayout';
import {
	ALL_USERS,
	CREATE_POST,
	EXPLORE,
	POST,
	PROFILE_FULL,
	SAVED,
	SIGNIN,
	SIGNUP,
	UPDATE_POST_FULL,
	UPDATE_PROFILE_FULL,
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
					<Route path={PROFILE_FULL} element={<Profile />} />
					<Route
						path={UPDATE_PROFILE_FULL}
						element={<UpdateProfile />}
					/>
					<Route path={UPDATE_POST_FULL} element={<UpdatePost />} />
					<Route path={POST} element={<Post />} />
				</Route>
			</Routes>
			<Toaster />
		</>
	);
};
export default App;
