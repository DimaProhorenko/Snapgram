import { motion } from 'framer-motion';
import { POST, PROFILE } from '@/constants/routes';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import { ProfileCard } from '../profile';
import { PostStats } from '.';
import { anim, scaleOpacity } from '@/lib/animation';

type GridPostItemProps = {
	post: Models.Document;
	userId: string;
	showUser?: boolean;
	showStats?: boolean;
};

const GridPostItem = ({
	post,
	userId,
	showUser = true,
	showStats = true,
}: GridPostItemProps) => {
	return (
		<motion.li className='relative min-w-64 h-80' {...anim(scaleOpacity)}>
			<Link to={`${POST}/${post?.$id}`} className='grid-post_link'>
				<img
					src={post?.imageUrl}
					alt={post?.caption}
					className='w-full h-full object-cover'
				/>
			</Link>
			<div className='grid-post_user'>
				{showUser && (
					<ProfileCard className='w-full'>
						<ProfileCard.Image
							profileImageUrl={post?.creator?.imageUrl}
							alt='creator'
							width={24}
							height={24}
							to={`${PROFILE}/${post?.creator?.$id}`}
						/>
						<ProfileCard.Name
							to={`${PROFILE}/${post?.creator?.$id}`}
							size='sm'
						>
							{post?.creator?.name}
						</ProfileCard.Name>
					</ProfileCard>
				)}
				{showStats && (
					<PostStats post={post} userId={userId} iconSize={20} />
				)}
			</div>
		</motion.li>
	);
};
export default GridPostItem;
