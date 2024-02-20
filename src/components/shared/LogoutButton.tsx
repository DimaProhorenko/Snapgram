import { useLogoutMutation } from '@/lib/react-query/queriesAndMutations';
import { Button } from '../ui/button';

type LogoutButtonType = {
	useIcon?: boolean;
};

const LogoutButton = ({ useIcon = true }: LogoutButtonType) => {
	const { mutateAsync: logout } = useLogoutMutation();
	return (
		<Button
			variant='ghost'
			className='shad-button_ghost'
			onClick={() => logout()}
		>
			{useIcon && <img src='/assets/icons/logout.svg' alt='logout' />}
			<p>Logout</p>
		</Button>
	);
};
export default LogoutButton;
