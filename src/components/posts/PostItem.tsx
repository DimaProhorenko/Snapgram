import { Models } from 'appwrite';
import { POST, PROFILE, UPDATE_POST } from '@/constants/routes';
import { ProfileCard } from '../profile';
import { formatDate } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';

type PostItemProps = {
	post: Models.Document;
};
const PostItem = ({ post }: PostItemProps) => {
	const {
		user: { id: accountId },
	} = useUserContext();
	const {
		$id: postId,
		$createdAt,
		caption,
		location,
		tags,
		imageUrl: postImageUrl,
	} = post;
	const { name, imageUrl, $id: creatorId } = post.creator;
	const profileLink = `${PROFILE}/${creatorId}`;

	return (
		<div className='post-card'>
			<div className='flex justify-between items-center'>
				<ProfileCard>
					<ProfileCard.Image
						profileImageUrl={imageUrl}
						alt={`Go to ${name} profile`}
						to={profileLink}
						width={32}
						height={32}
					/>
					<ProfileCard.Content>
						<ProfileCard.Name to={profileLink}>
							{name}
						</ProfileCard.Name>
						<div className='flex gap-3'>
							<p className='text-xs text-light-3'>
								{formatDate($createdAt)}
							</p>
							<p className='text-xs text-light-3'>{location}</p>
						</div>
					</ProfileCard.Content>
				</ProfileCard>
				{accountId === creatorId && (
					<Link to={`${UPDATE_POST}/${postId}`}>
						<img
							src='/assets/icons/edit.svg'
							alt='Edit post'
							width={20}
						/>
					</Link>
				)}
			</div>
			<div>
				<Link to={`${POST}/${postId}`}>
					<h3 className='pt-5 mb-2 small-medium lg:base-medium'>
						{caption}
					</h3>
				</Link>
				<ul className='flex gap-1 flex-wrap mb-6'>
					{tags.map((tag: string) => (
						<li
							key={tag}
							className='text-light-3 text-xs lg:text-sm'
						>
							{tag}
						</li>
					))}
				</ul>
				<Link to={`${POST}/${postId}`}>
					<img
						src={postImageUrl}
						alt={caption}
						className='post-card_img'
					/>
				</Link>
			</div>
		</div>
	);
};
export default PostItem;
