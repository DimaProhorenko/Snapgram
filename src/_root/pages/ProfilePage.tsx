import { GridPostsList } from '@/components/posts';
import { ProfileCard, UserProfile } from '@/components/profile';
import Page from '@/components/routes/Page';
import { Loader } from '@/components/shared';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserContext } from '@/context/AuthContext';
import {
	useGetPostsByUserId,
	useGetSavedPosts,
	useGetUserById,
} from '@/lib/react-query/queriesAndMutations';
import { TabsContent } from '@radix-ui/react-tabs';
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

	const savedPosts = data?.documents?.map(
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

				{id === userId && (
					<div>
						<Tabs defaultValue='posts' className='py-4'>
							<TabsList className='mb-4'>
								<TabsTrigger value='posts'>
									Your posts
								</TabsTrigger>
								<TabsTrigger value='liked'>
									Saved posts
								</TabsTrigger>
							</TabsList>
							<TabsContent value='posts'>
								{isPostLoading && <Loader />}
								{posts && (
									<GridPostsList posts={posts.documents} />
								)}
							</TabsContent>
							<TabsContent value='liked'>
								{isSavedLoading && <Loader />}
								{savedPosts && (
									<GridPostsList posts={savedPosts} />
								)}
							</TabsContent>
						</Tabs>
					</div>
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
