import { Button } from '../ui/button';

type IconButtonProps = {
	src: string;
	alt: string;
	onClick: () => void;
	width?: number;
	height?: number;
};

const IconButton = ({
	src,
	alt,
	onClick,
	width = 24,
	height = 24,
}: IconButtonProps) => {
	return (
		<Button onClick={onClick} size='icon'>
			<img src={src} alt={alt} width={width} height={height} />
		</Button>
	);
};
export default IconButton;
