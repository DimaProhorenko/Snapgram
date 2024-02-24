import { IconButton } from '.';

type LikeButtonProps = {
	isLiked?: boolean;
	count?: number;
	onClick: () => void;
};

const LikeButton = ({
	isLiked = false,
	count = 0,
	onClick,
}: LikeButtonProps) => {
	return (
		<div className='flex items-center'>
			<IconButton
				src={
					isLiked
						? '/assets/icons/liked.svg'
						: '/assets/icons/like.svg'
				}
				alt='like'
				onClick={onClick}
			/>
			<span>{count}</span>
		</div>
	);
};
export default LikeButton;
