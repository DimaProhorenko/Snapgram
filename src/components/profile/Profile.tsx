import { ProfileCard } from '.';

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
		<ProfileCard>
			<ProfileCard.Image
				profileImageUrl={profileImageSrc || 'assets/images/profile.png'}
				alt={`Go to ${name} profile`}
				to={to}
				width={profileImageSize}
				height={profileImageSize}
			/>
			<ProfileCard.Content>
				<ProfileCard.Name to={to}>{name}</ProfileCard.Name>
				<ProfileCard.Username to={to}>{username}</ProfileCard.Username>
			</ProfileCard.Content>
		</ProfileCard>
	);
};
export default Profile;
