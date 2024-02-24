import { IconButton } from '.';

type SaveButtonType = {
	isSaved?: boolean;
	onClick: () => void;
};

const SaveButton = ({ isSaved = false, onClick }: SaveButtonType) => {
	return (
		<IconButton
			src={isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
			alt='Save'
			onClick={onClick}
		/>
	);
};
export default SaveButton;
