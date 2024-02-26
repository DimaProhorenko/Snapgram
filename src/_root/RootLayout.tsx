import { Outlet } from 'react-router-dom';

import { BottomBar, LeftSidebar, TopBar } from '@/components/layout';

const RootLayout = () => {
	return (
		<div className='w-full md:flex container'>
			<TopBar />
			<LeftSidebar />
			<section className='flex flex-1'>
				<Outlet />
			</section>
			<BottomBar />
		</div>
	);
};
export default RootLayout;
