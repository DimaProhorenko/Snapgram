import { Navigate, Outlet } from 'react-router-dom';

import { SIGNIN } from '@/constants/routes';
import { useUserContext } from '@/context/AuthContext';
import { BottomBar, LeftSidebar, TopBar } from '@/components/layout';

const RootLayout = () => {
	// const { isAuthenticated } = useUserContext();
	// console.log('Rendered');
	// console.log(isAuthenticated);

	// if (!isAuthenticated) {
	// 	return <Navigate to={SIGNIN} />;
	// }

	return (
		<div className='w-full md:flex'>
			<TopBar />
			<LeftSidebar />
			<section className='flex flex-1 min-h-screen'>
				<Outlet />
			</section>
			<BottomBar />
		</div>
	);
};
export default RootLayout;
