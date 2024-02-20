import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '@/lib/react-query/queriesAndMutations';

import { Logo } from '.';
import { Button } from '../ui/button';

const TopBar = () => {
	const { mutateAsync: signout, isSuccess } = useLogoutMutation();
	const navigate = useNavigate();

	useEffect(() => {
		if (isSuccess) {
			navigate(0);
		}
	}, [isSuccess, navigate]);

	return (
		<section className='topbar py-2'>
			<div className='flex-between'>
				<Logo />
				<Button onClick={() => signout()}>
					<img
						src='assets/icons/logout.svg'
						alt='logout'
						width={24}
						height={24}
					/>
				</Button>
			</div>
		</section>
	);
};
export default TopBar;
