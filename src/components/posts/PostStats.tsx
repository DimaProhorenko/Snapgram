import { useEffect, useState } from 'react';
import { Models } from 'appwrite';
import { LikeButton, Loader, SaveButton } from '../shared';
import { checkIsLiked } from '@/lib/utils';
import {
	useDeleteSavedPost,
	useGetCurrentUser,
	useLikePost,
	useSavePost,
} from '@/lib/react-query/queriesAndMutations';

type PostStatsProps = {
	post?: Models.Document;
	userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
	const likesList = post?.likes?.map((user: Models.Document) => user.$id);
	const [likes, setLikes] = useState(likesList);
	const [isPostSaved, setIsPostSaved] = useState(false);
	const { mutateAsync: likePost } = useLikePost();
	const { mutateAsync: savePost, isPending: isSavingPost } = useSavePost();
	const { mutateAsync: deleteSavedPost, isPending: isDeletingSavedPost } =
		useDeleteSavedPost();
	const { data: currentUser } = useGetCurrentUser();
	const savedPostRecord = currentUser?.save?.find(
		(record: Models.Document) => record.post.$id === post?.$id
	);

	useEffect(() => {
		setIsPostSaved(!!savedPostRecord);
	}, [savedPostRecord]);

	const handleLikePost = () => {
		if (post) {
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
			likePost({ postId: post?.$id, likesArr: newLikes });
		}
	};

	const handleSavePost = () => {
		if (post) {
			if (savedPostRecord) {
				setIsPostSaved(false);
				deleteSavedPost(savedPostRecord.$id);
				return;
			}

			savePost({ postId: post.$id, userId });
			setIsPostSaved(true);
		}
	};

	return (
		<div className='flex items-center justify-between'>
			<LikeButton
				isLiked={checkIsLiked(likes, userId)}
				count={likes?.length}
				onClick={handleLikePost}
			/>
			<div className='flex'>
				{isSavingPost || isDeletingSavedPost ? (
					<Loader />
				) : (
					<SaveButton
						isSaved={isPostSaved}
						onClick={handleSavePost}
					/>
				)}
			</div>
		</div>
	);
};
export default PostStats;
