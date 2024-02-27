import PostForm from '@/components/forms/PostForm';
import Page from '@/components/routes/Page';

const CreatePost = () => {
	return (
		<Page>
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
					<PostForm />
				</div>
			</div>
		</Page>
	);
};
export default CreatePost;
