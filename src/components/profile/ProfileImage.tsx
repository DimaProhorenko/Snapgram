type ProfileImageType = {
	profileImageUrl: string;
	width?: number;
	height?: number;
};
const ProfileImage = ({
	profileImageUrl,
	width = 28,
	height = 28,
}: ProfileImageType) => {
	return (
		<img
			src={profileImageUrl || 'assets/images/profile-placeholder.svg'}
			alt='Go to profile'
			className='rounded-full'
			width={width}
			height={height}
		/>
	);
};
export default ProfileImage;
