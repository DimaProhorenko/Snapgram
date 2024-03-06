import { Logo } from '../../shared';
import { PROFILE } from '@/constants/routes';
import Profile from '../../profile/Profile';
import LeftSidebarNav from './LeftSidebarNav';
import LogoutButton from '@/components/shared/LogoutButton';
import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutations';

const LeftSidebar = () => {
	const { data: user } = useGetCurrentUser();
	return (
		<nav className='leftsidebar overflow-y-auto h-screen custom-scrollbar'>
			<div className='flex flex-col gap-11'>
				<Logo width={170} />
				{user && (
					<Profile
						profileImageSrc={user.imageUrl}
						profileImageSize={35}
						name={user.name}
						username={user.username}
						to={`${PROFILE}/${user.$id}`}
					/>
				)}
				<LeftSidebarNav />
				<LogoutButton />
			</div>
		</nav>
	);
};
export default LeftSidebar;
