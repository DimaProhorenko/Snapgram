import { Loader } from '.';
import { Button } from '../ui/button';

type IconButtonProps = {
	src: string;
	alt: string;
	onClick: () => void;
	width?: number;
	height?: number;
	showLoader?: boolean;
};

const IconButton = ({
	src,
	alt,
	onClick,
	width = 24,
	height = 24,
	showLoader = false,
}: IconButtonProps) => {
	return (
		<Button onClick={onClick} size='icon'>
			{showLoader ? (
				<Loader />
			) : (
				<img src={src} alt={alt} width={width} height={height} />
			)}
		</Button>
	);
};
export default IconButton;
