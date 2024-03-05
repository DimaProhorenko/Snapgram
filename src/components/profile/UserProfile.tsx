import { Models } from 'appwrite';
import { Loader } from '../shared';
import { GridPostsList } from '../posts';

type UserProfileProps = {
	posts: Models.Document[];
	isLoading: boolean;
	name: string;
};

const UserProfile = ({ posts, isLoading, name }: UserProfileProps) => {
	return (
		<div>
			<h2 className='mb-4 font-medium text-xl'>{name}'s posts</h2>
			{isLoading && <Loader />}
			{posts && <GridPostsList posts={posts} />}
		</div>
	);
};
export default UserProfile;
