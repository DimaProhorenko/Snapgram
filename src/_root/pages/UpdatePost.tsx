import PostForm from '@/components/forms/PostForm';
import { Loader } from '@/components/shared';
import { useGetPostById } from '@/lib/react-query/queriesAndMutations';
import { useParams } from 'react-router-dom';

const UpdatePost = () => {
	const { id } = useParams();
	const { data: post, isPending: isPostLoading } = useGetPostById(id || '');
	console.log(post);

	if (isPostLoading) {
		return <Loader />;
	}
	return (
		<div className='flex flex-1'>
			<div className='common-container'>
				<div className='flex w-full gap-3'>
					<img
						src='/assets/icons/add-post.svg'
						alt='Add'
						width={36}
						height={36}
					/>
					<h2 className='h3-bold md:h2-bold text-left w-full'>
						Edit Post
					</h2>
				</div>
				<PostForm post={post} action='Update' />
			</div>
		</div>
	);
};
export default UpdatePost;
