import { Button } from '../ui/button';

type IconButtonProps = {
	src: string;
	alt: string;
	onClick: () => void;
};

const IconButton = ({ src, alt, onClick }: IconButtonProps) => {
	return (
		<Button onClick={onClick} size='icon'>
			<img src={src} alt={alt} />
		</Button>
	);
};
export default IconButton;
