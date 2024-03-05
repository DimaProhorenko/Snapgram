import { GridPostsList } from '@/components/posts';
import { ProfileCard } from '@/components/profile';
import Page from '@/components/routes/Page';
import { Loader } from '@/components/shared';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserContext } from '@/context/AuthContext';
import {
	useGetPostsByUserId,
	useGetSavedPosts,
} from '@/lib/react-query/queriesAndMutations';
import { TabsContent } from '@radix-ui/react-tabs';
import { Models } from 'appwrite';

const ProfilePage = () => {
	const {
		user: { imageUrl, name, username, id: userId },
	} = useUserContext();
	const { data: posts, isLoading: isPostLoading } =
		useGetPostsByUserId(userId);

	const { data, isLoading: isSavedLoading } = useGetSavedPosts(userId);

	const savedPosts = data?.documents?.map(
		(item: Models.Document) => item?.post
	);

	console.log(savedPosts);

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

				<div>
					<Tabs defaultValue='posts' className='py-4'>
						<TabsList className='mb-4'>
							<TabsTrigger value='posts'>Your posts</TabsTrigger>
							<TabsTrigger value='liked'>Saved posts</TabsTrigger>
						</TabsList>
						<TabsContent value='posts'>
							{isPostLoading && <Loader />}
							{posts && (
								<GridPostsList posts={posts?.documents} />
							)}
						</TabsContent>
						<TabsContent value='liked'>
							{isSavedLoading && <Loader />}
							{savedPosts && <GridPostsList posts={savedPosts} />}
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</Page>
	);
};
export default ProfilePage;
