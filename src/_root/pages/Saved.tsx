import { GridPostsList } from '@/components/posts';
import Page from '@/components/routes/Page';
import { Loader } from '@/components/shared';
import { useUserContext } from '@/context/AuthContext';
import { useGetSavedPosts } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';

const Saved = () => {
	const {
		user: { id: userId },
	} = useUserContext();
	const { data, isFetching } = useGetSavedPosts(userId);
	const postsRaw = data?.documents;
	const posts = postsRaw?.map((item: Models.Document) => ({ ...item.post }));
	console.log(data);
	return (
		<Page>
			<div className='saved-container'>
				<h2 className='h3-bold md:h2-bold w-full'>Your saves</h2>
				{isFetching && <Loader />}
				{!isFetching && posts && <GridPostsList posts={posts} />}
			</div>
		</Page>
	);
};
export default Saved;
