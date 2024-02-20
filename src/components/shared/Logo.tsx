import { Link } from 'react-router-dom';

import { HOME } from '@/constants/routes';

type LogoType = {
	width?: number;
	height?: number;
};

const Logo = ({ width = 140, height = 36 }: LogoType) => {
	return (
		<div>
			<Link to={HOME}>
				<img
					src='assets/images/logo.svg'
					alt='Snapgram'
					width={width}
					height={height}
				/>
			</Link>
		</div>
	);
};
export default Logo;
