import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '@/lib/react-query/queriesAndMutations';

import { PROFILE } from '@/constants/routes';
import { useUserContext } from '@/context/AuthContext';
import { Logo } from '@/components/shared';
import ProfileImage from '@/components/profile/ProfileImage';
import { Button } from '@/components/ui/button';

const TopBar = () => {
	const {
		user: { id, imageUrl },
	} = useUserContext();
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
				<div className='flex items-center'>
					<Link to={`${PROFILE}/${id}`}>
						<ProfileImage profileImageUrl={imageUrl} />
					</Link>
					<Button onClick={() => signout()} size='icon'>
						<img
							src='assets/icons/logout.svg'
							alt='logout'
							width={24}
							height={24}
						/>
					</Button>
				</div>
			</div>
		</section>
	);
};
export default TopBar;
