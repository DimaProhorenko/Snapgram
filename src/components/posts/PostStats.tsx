import { useState } from 'react';
import { Models } from 'appwrite';
import { LikeButton, SaveButton } from '../shared';
import { checkIsLiked } from '@/lib/utils';
import { useLikePost } from '@/lib/react-query/queriesAndMutations';

type PostStatsProps = {
	post: Models.Document;
	userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
	const likesList = post?.liked?.map((user: Models.Document) => user.$id);
	const [likes, setLikes] = useState(likesList);
	// const [isSaved, setIsSaved] = useState(false);
	const { mutateAsync: likePost } = useLikePost();

	const handleLikePost = () => {
		console.log('LIKING');
		let newLikes = [...(likes || [])];
		console.log('newLikes before', newLikes);

		const hasLiked = newLikes.includes(userId);

		if (hasLiked) {
			newLikes = newLikes.filter((id: string) => id !== userId);
		} else {
			newLikes.push(userId);
		}
		console.log('newLikesAfter', newLikes);
		setLikes(newLikes);
		likePost({ postId: post.$id, likesArr: newLikes });
	};

	// const handleSavePost = () => {};

	return (
		<div className='flex items-center justify-between'>
			<LikeButton
				isLiked={checkIsLiked(likes, userId)}
				count={likes?.length}
				onClick={handleLikePost}
			/>
			<SaveButton />
		</div>
	);
};
export default PostStats;
