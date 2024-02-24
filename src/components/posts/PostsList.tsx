import { Models } from 'appwrite';
import PostItem from './PostItem';

type PostsListProps = {
	posts: Models.Document[] | undefined;
};
const PostsList = ({ posts }: PostsListProps) => {
	return (
		<ul className='flex flex-col flex-1 gap-9 w-full'>
			{posts?.map((post: Models.Document) => (
				<li key={post.$id}>
					<PostItem post={post} />
				</li>
			))}
		</ul>
	);
};
export default PostsList;
