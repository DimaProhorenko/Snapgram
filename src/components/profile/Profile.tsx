import { Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';

type ProfileType = {
	profileImageSrc: string;
	profileImageSize?: number;
	name: string;
	username: string;
	to: string;
};

const Profile = ({
	profileImageSrc,
	profileImageSize,
	name,
	username,
	to,
}: ProfileType) => {
	return (
		<div className='flex gap-3 items-center'>
			<Link to={to}>
				<ProfileImage
					profileImageUrl={profileImageSrc}
					width={profileImageSize}
					height={profileImageSize}
				/>
			</Link>
			<div className=''>
				<Link to={to}>
					<h4 className='font-bold text-base md:text-lg'>{name}</h4>
				</Link>
				<Link to={to}>
					<p className='text-light-3 text-xs md:text-sm'>
						@{username}
					</p>
				</Link>
			</div>
		</div>
	);
};
export default Profile;
