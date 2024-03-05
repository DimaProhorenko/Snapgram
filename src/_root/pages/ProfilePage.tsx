import { CreatorProfile, ProfileCard, UserProfile } from '@/components/profile';
import Page from '@/components/routes/Page';
import { useUserContext } from '@/context/AuthContext';
import {
	useGetPostsByUserId,
	useGetSavedPosts,
	useGetUserById,
} from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
	const { id } = useParams();
	const { data: user } = useGetUserById(id || '');
	const {
		user: { id: userId },
	} = useUserContext();
	const { data: posts, isLoading: isPostLoading } = useGetPostsByUserId(
		id || ''
	);
	const { data, isLoading: isSavedLoading } = useGetSavedPosts(userId);

	const savedPosts: Models.Document[] | undefined = data?.documents?.map(
		(item: Models.Document) => item?.post
	);

	return (
		<Page>
			<div className='profile-container'>
				{user && (
					<ProfileCard>
						<ProfileCard.Image
							profileImageUrl={user.imageUrl}
							alt={user.name}
							className='w-14 aspect-square'
						/>
						<ProfileCard.Content>
							<ProfileCard.Name size='lg'>
								{user.name}
							</ProfileCard.Name>
							<ProfileCard.Username>
								{user.username}
							</ProfileCard.Username>
						</ProfileCard.Content>
					</ProfileCard>
				)}

				{id === userId && posts && (
					<CreatorProfile
						creatorPosts={posts?.documents}
						savedPosts={savedPosts || []}
						isCreatorPostsLoading={isPostLoading}
						isSavedPostsLoading={isSavedLoading}
					/>
				)}

				{id !== userId && posts && (
					<UserProfile
						posts={posts?.documents}
						isLoading={isPostLoading}
						name={user?.name}
					/>
				)}
			</div>
		</Page>
	);
};
export default ProfilePage;
