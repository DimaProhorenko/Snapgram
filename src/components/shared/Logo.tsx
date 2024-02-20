import { Link } from 'react-router-dom';

import { HOME } from '@/constants/routes';

const Logo = () => {
	return (
		<div>
			<Link to={HOME}>
				<img src='images/logo.svg' alt='Snapgram' width={130} />
			</Link>
		</div>
	);
};
export default Logo;
