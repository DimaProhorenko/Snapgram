import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
	const isAuthenticated = false;
	return (
		<>
			{isAuthenticated ? (
				<Navigate to='/' />
			) : (
				<>
					<section className='flex items-center justify-center'>
						<div className='xl:w-1/2'>
							<Outlet />
						</div>
						<img
							src='assets/images/side-img.svg'
							alt='logo'
							className='w-1/2 h-screen object-cover bg-no-repeat hidden xl:block'
						/>
					</section>
				</>
			)}
		</>
	);
};
export default AuthLayout;
