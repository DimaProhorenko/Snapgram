import { List } from '@/components/shared';
import { sidebarLinks } from '@/constants/navLinks';
import { INavLink } from '@/types';
import { NavLink } from 'react-router-dom';

const render = ({ route, label, imgURL }: INavLink) => {
	return (
		<NavLink
			to={route}
			className='leftsidebar-link flex items-center gap-3 p-3 group'
		>
			<img
				src={imgURL}
				alt={label}
				className='group-hover:invert-white'
			/>
			{label}
		</NavLink>
	);
};

const LeftSidebarNav = () => {
	return <List items={sidebarLinks} render={render} className='space-y-4' />;
};
export default LeftSidebarNav;
