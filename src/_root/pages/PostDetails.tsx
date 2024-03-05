import { PostProfileCard, PostStats } from '@/components/posts';
import Page from '@/components/routes/Page';
import { IconButton, Loader } from '@/components/shared';
import { HOME, PROFILE, UPDATE_POST } from '@/constants/routes';
import { useUserContext } from '@/context/AuthContext';
import {
	useDeletePost,
	useGetPostById,
} from '@/lib/react-query/queriesAndMutations';
import { Link, useNavigate, useParams } from 'react-router-dom';

const PostDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data: post, isPending: isPostLoading } = useGetPostById(id || '');
	const {
		user: { id: userId },
	} = useUserContext();
	const { mutateAsync: deletePost, isPending } = useDeletePost();
	console.log(post);
	return (
		<Page>
			<div className='post_details-container'>
				{isPostLoading ? (
					<Loader />
				) : (
					<div className='post_details-card items-start'>
						<img
							src={post?.imageUrl}
							alt='Post'
							className='post_details-img w-full'
						/>
						<div className='w-full xl:w-1/2'>
							<div className='flex justify-between'>
								<PostProfileCard
									profileImage={post?.creator?.imageUrl}
									profileLink={`${PROFILE}/${post?.creator?.$id}`}
									name={post?.creator?.name}
									creationDate={post?.$createdAt || ''}
									location={post?.location || ''}
								/>
								{userId === post?.creator?.$id && (
									<div className='flex items-center gap-3'>
										<Link
											to={`${UPDATE_POST}/${post?.$id}`}
										>
											<img
												src='/assets/icons/edit.svg'
												alt='Edit post'
												width={24}
												height={24}
											/>
										</Link>
										<IconButton
											src='/assets/icons/delete.svg'
											alt='Delete post'
											showLoader={isPending}
											onClick={async () => {
												const res = await deletePost({
													postId: post?.$id,
													imageId: post?.imageId,
												});
												if (res?.status === 'ok') {
													navigate(HOME);
												}
											}}
										/>
									</div>
								)}
							</div>
							<hr className='w-full border border-dark-4/80 my-4' />
							<div>
								<h3 className='mb-2 text-lg lg:text-xl xl:text-2xl'>
									{post?.caption}
								</h3>
								<ul className='flex gap-1 flex-wrap mb-6'>
									{post?.tags.map((tag: string) => (
										<li
											key={tag}
											className='text-light-3 text-xs lg:text-sm'
										>
											{tag}
										</li>
									))}
								</ul>
								<PostStats post={post} userId={userId} />
							</div>
						</div>
					</div>
				)}
			</div>
		</Page>
	);
};
export default PostDetails;
