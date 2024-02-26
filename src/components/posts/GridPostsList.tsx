import { useUserContext } from '@/context/AuthContext';
import { Models } from 'appwrite';
import { GridPostItem } from '.';

type GridPostsListProps = {
	posts: Models.Document[];
};

const GridPostsList = ({ posts }: GridPostsListProps) => {
	const {
		user: { id: userId },
	} = useUserContext();
	return (
		<ul className='grid-container'>
			{posts.map((post: Models.Document) => (
				<GridPostItem key={post.$id} post={post} userId={userId} />
			))}
		</ul>
	);
};
export default GridPostsList;
