import CreatePostForm from '@/components/forms/CreatePostForm';

const CreatePost = () => {
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
						Create Post
					</h2>
				</div>
				<CreatePostForm />
			</div>
		</div>
	);
};
export default CreatePost;
