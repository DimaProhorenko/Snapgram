import { motion } from 'framer-motion';

type IVariant = {
	initial: object;
	animate: object;
	exit: object;
};

type PageProps = {
	children: React.ReactNode;
};

const opacity = {
	initial: {
		opacity: 0,
	},
	enter: {
		opacity: 1,
		transition: {
			duration: 1,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 1,
		},
	},
};

const Page = ({ children }: PageProps) => {
	const anim = (variants) => {
		return {
			initial: 'initial',
			animate: 'enter',
			exit: 'exit',
			variants,
		};
	};

	return <motion.div {...anim(opacity)}>{children}</motion.div>;
};
export default Page;
