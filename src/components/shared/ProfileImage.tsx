type ProfileImageType = {
	profileImageUrl: string;
};
const ProfileImage = ({ profileImageUrl }: ProfileImageType) => {
	return (
		<img
			src={profileImageUrl || 'assets/images/profile-placeholder.svg'}
			width={24}
			height={24}
		/>
	);
};
export default ProfileImage;
