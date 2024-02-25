import { IconButton } from '.';

type SaveButtonType = {
	isSaved?: boolean;
	onClick: () => void;
	width?: number;
	height?: number;
};

const SaveButton = ({
	isSaved = false,
	onClick,
	width = 24,
	height = 24,
}: SaveButtonType) => {
	return (
		<IconButton
			src={isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
			alt='Save'
			onClick={onClick}
			width={width}
			height={height}
		/>
	);
};
export default SaveButton;
