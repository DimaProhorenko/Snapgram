import { PostList } from '@/components/posts';
import { Loader } from '@/components/shared';
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations';

const Home = () => {
	const { data: posts, isPending: isPostLoading } = useGetRecentPosts();
	return (
		<div className='flex flex-1'>
			<div className='home-container'>
				<div className='home-posts'>
					<h2 className='h3-bold md:h2-bold text-left w-full'>
						Home Feed
					</h2>
					{isPostLoading ? (
						<Loader />
					) : (
						<PostList posts={posts?.documents} />
					)}
				</div>
			</div>
		</div>
	);
};
export default Home;
