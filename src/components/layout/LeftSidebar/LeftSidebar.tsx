import { useUserContext } from '@/context/AuthContext';
import { Logo } from '../../shared';
import { PROFILE } from '@/constants/routes';
import Profile from '../../profile/Profile';
import LeftSidebarNav from './LeftSidebarNav';
import LogoutButton from '@/components/shared/LogoutButton';

const LeftSidebar = () => {
	const {
		user: { id, imageUrl, name, username },
	} = useUserContext();
	return (
		<nav className='leftsidebar overflow-y-auto h-screen custom-scrollbar'>
			<div className='flex flex-col gap-11'>
				<Logo width={170} />
				<Profile
					profileImageSrc={imageUrl}
					profileImageSize={35}
					name={name}
					username={username}
					to={`${PROFILE}/${id}`}
				/>
				<LeftSidebarNav />
				<LogoutButton />
			</div>
		</nav>
	);
};
export default LeftSidebar;
