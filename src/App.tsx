import { Toaster } from './components/ui/toaster';
import './globals.css';

import { Route, Routes, useLocation } from 'react-router-dom';
import {
	AllUsers,
	CreatePost,
	Explore,
	Home,
	LikedPosts,
	PostDetails,
	ProfilePage,
	Saved,
	UpdatePost,
	UpdateProfile,
} from './_root/pages';
import { AnimatePresence } from 'framer-motion';
import AuthLayout from './_auth/AuthLayout';
import {
	ALL_USERS,
	CREATE_POST,
	EXPLORE,
	LIKED_POSTS,
	POST_FULL,
	PROFILE_FULL,
	SAVED,
	SIGNIN,
	SIGNUP,
	UPDATE_POST_FULL,
	UPDATE_PROFILE_FULL,
} from './constants/routes';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import RootLayout from './_root/RootLayout';

const App = () => {
	const location = useLocation();
	return (
		<>
			<AnimatePresence mode='wait'>
				<Routes location={location} key={location.pathname}>
					{/* <Route index element={<Home />} />
					<Route path='/explore' element={<Explore />} /> */}

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
						<Route path={PROFILE_FULL} element={<ProfilePage />} />
						<Route
							path={UPDATE_PROFILE_FULL}
							element={<UpdateProfile />}
						/>
						<Route
							path={UPDATE_POST_FULL}
							element={<UpdatePost />}
						/>
						<Route path={POST_FULL} element={<PostDetails />} />
						<Route path={LIKED_POSTS} element={<LikedPosts />} />
					</Route>
				</Routes>
			</AnimatePresence>

			<Toaster />
		</>
	);
};
export default App;
