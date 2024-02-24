import { Models } from 'appwrite';

type PostsListProps = {
	posts: Models.Document[] | undefined;
};
const PostsList = ({ posts }: PostsListProps) => {
	return (
		<ul>
			{posts?.map((post: Models.Document) => (
				<li key={post.$id}>{post.caption}</li>
			))}
		</ul>
	);
};
export default PostsList;
