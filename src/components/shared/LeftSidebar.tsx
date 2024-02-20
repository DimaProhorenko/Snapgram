import { useUserContext } from '@/context/AuthContext';
import { Logo } from '.';
import { PROFILE } from '@/constants/routes';
import Profile from '../profile/Profile';

const LeftSidebar = () => {
	const {
		user: { id, imageUrl, name, username },
	} = useUserContext();
	return (
		<nav className='leftsidebar'>
			<div className='flex flex-col gap-11'>
				<Logo width={170} />
				<Profile
					profileImageSrc={imageUrl}
					profileImageSize={35}
					name={name}
					username={username}
					to={`${PROFILE}/${id}`}
				/>
			</div>
		</nav>
	);
};
export default LeftSidebar;
