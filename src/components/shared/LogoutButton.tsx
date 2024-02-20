import { useLogoutMutation } from '@/lib/react-query/queriesAndMutations';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { SIGNIN } from '@/constants/routes';

type LogoutButtonType = {
	useIcon?: boolean;
};

const LogoutButton = ({ useIcon = true }: LogoutButtonType) => {
	const navigate = useNavigate();
	const { mutateAsync: logout } = useLogoutMutation();
	return (
		<Button
			variant='ghost'
			className='shad-button_ghost'
			onClick={async () => {
				const session = await logout();
				console.log(!!session);
				if (session) {
					navigate(SIGNIN);
				}
			}}
		>
			{useIcon && <img src='/assets/icons/logout.svg' alt='logout' />}
			<p>Logout</p>
		</Button>
	);
};
export default LogoutButton;
