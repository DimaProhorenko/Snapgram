import { Button } from '../ui/button';

type LikeButtonProps = {
	isLiked?: boolean;
	count?: number;
	size?: number;
	onClick: () => void;
};

const LikeButton = ({
	isLiked = false,
	count = 0,
	size = 24,
	onClick,
}: LikeButtonProps) => {
	return (
		<Button
			className='flex items-center gap-1'
			onClick={onClick}
			size='icon'
		>
			<img
				src={
					isLiked
						? '/assets/icons/liked.svg'
						: '/assets/icons/like.svg'
				}
				alt='like'
				width={size}
				height={size}
			/>

			<span>{count}</span>
		</Button>
	);
};
export default LikeButton;
