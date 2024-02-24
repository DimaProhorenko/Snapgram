import { Link } from 'react-router-dom';

type ProfileNameType = {
	name: string;
	to: string;
};

const ProfileName = ({ name, to }: ProfileNameType) => {
	return (
		<Link to={to}>
			<h4 className='font-bold text-base md:text-lg'>{name}</h4>
		</Link>
	);
};
export default ProfileName;
