import { Models } from 'appwrite';
import { GridPostsList } from '../posts';
import { Loader } from '../shared';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '../ui/tabs';
import { Link } from 'react-router-dom';
import { UPDATE_PROFILE } from '@/constants/routes';
import { useUserContext } from '@/context/AuthContext';

type CreatorProfileProps = {
	creatorPosts: Models.Document[];
	savedPosts: Models.Document[];
	isCreatorPostsLoading: boolean;
	isSavedPostsLoading: boolean;
};

const CreatorProfile = ({
	creatorPosts,
	savedPosts,
	isCreatorPostsLoading,
	isSavedPostsLoading,
}: CreatorProfileProps) => {
	const {
		user: { id },
	} = useUserContext();
	return (
		<div>
			<Link
				to={`${UPDATE_PROFILE}/${id}`}
				className='text-purple-500 hover:text-purple-600 transition-colors'
			>
				Update your profile
			</Link>
			<Tabs defaultValue='posts' className='py-4'>
				<TabsList className='mb-4'>
					<TabsTrigger value='posts'>Your posts</TabsTrigger>
					<TabsTrigger value='liked'>Saved posts</TabsTrigger>
				</TabsList>
				<TabsContent value='posts'>
					{isCreatorPostsLoading && <Loader />}
					{creatorPosts && <GridPostsList posts={creatorPosts} />}
				</TabsContent>
				<TabsContent value='liked'>
					{isSavedPostsLoading && <Loader />}
					{savedPosts && <GridPostsList posts={savedPosts} />}
				</TabsContent>
			</Tabs>
		</div>
	);
};
export default CreatorProfile;
