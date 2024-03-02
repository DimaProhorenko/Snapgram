import { ProfileCard } from '@/components/profile';
import Page from '@/components/routes/Page';
import { useUserContext } from '@/context/AuthContext';

const ProfilePage = () => {
	const {
		user: { imageUrl, name, username },
	} = useUserContext();
	return (
		<Page>
			<div className='profile-container'>
				<ProfileCard>
					<ProfileCard.Image
						profileImageUrl={imageUrl}
						alt={name}
						className='w-14 aspect-square'
					/>
					<ProfileCard.Content>
						<ProfileCard.Name size='lg'>{name}</ProfileCard.Name>
						<ProfileCard.Username>{username}</ProfileCard.Username>
					</ProfileCard.Content>
				</ProfileCard>
			</div>
		</Page>
	);
};
export default ProfilePage;
