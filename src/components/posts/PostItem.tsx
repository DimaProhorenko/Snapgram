import { Models } from 'appwrite';
import { PROFILE } from '@/constants/routes';
import { ProfileCard } from '../profile';
import { formatDate } from '@/lib/utils';

type PostItemProps = {
	post: Models.Document;
};
const PostItem = ({ post }: PostItemProps) => {
	const { $createdAt, location } = post;
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
					<div className='flex gap-3'>
						<p className='text-xs text-light-3'>
							{formatDate($createdAt)}
						</p>
						<p className='text-xs text-light-3'>{location}</p>
					</div>
				</ProfileCard.Content>
			</ProfileCard>
		</div>
	);
};
export default PostItem;
