import { IconButton } from '.';

type SaveButtonType = {
	isSaved?: boolean;
	onClick: () => void;
	size?: number;
};

const SaveButton = ({
	isSaved = false,
	onClick,
	size = 24,
}: SaveButtonType) => {
	return (
		<IconButton
			src={isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
			alt='Save'
			onClick={onClick}
			width={size}
			height={size}
		/>
	);
};
export default SaveButton;
