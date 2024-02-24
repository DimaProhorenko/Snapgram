import { Models } from 'appwrite';
import { PROFILE } from '@/constants/routes';
import { ProfileCard } from '../profile';

type PostItemProps = {
	post: Models.Document;
};
const PostItem = ({ post }: PostItemProps) => {
	const { name, imageUrl, $id: creatorId } = post.creator;
	const profileLink = `${PROFILE}/${creatorId}`;

	return (
		<div className='post-card'>
			<ProfileCard>
				<ProfileCard.Image
					profileImageUrl={imageUrl}
					alt={`Go to ${name} profile`}
					to={profileLink}
				/>
				<ProfileCard.Content>
					<ProfileCard.Name to={profileLink}>{name}</ProfileCard.Name>
				</ProfileCard.Content>
			</ProfileCard>
		</div>
	);
};
export default PostItem;
