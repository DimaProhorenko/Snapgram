import { NavLink } from 'react-router-dom';
import { List } from '@/components/shared';
import { bottombarLinks } from '@/constants/navLinks';
import { INavLink } from '@/types';

const render = ({ route, imgURL, label }: INavLink) => {
	return (
		<NavLink
			to={route}
			className='bottombar-link flex flex-col items-center gap-2 p-2'
		>
			<img src={imgURL} alt={label} width={16} height={16} />
			<p className='tiny-medium text-light-2'>{label}</p>
		</NavLink>
	);
};

const BottomBar = () => {
	return (
		<section className='bottom-bar'>
			<List
				items={bottombarLinks}
				render={render}
				className='flex justify-between w-full'
			/>
		</section>
	);
};
export default BottomBar;
