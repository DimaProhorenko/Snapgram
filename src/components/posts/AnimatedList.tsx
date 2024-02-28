import { AnimatePresence } from 'framer-motion';

type AnimatedListProps = {
	children: React.ReactNode;
	isVisible: boolean;
};

const AnimatedList = ({ children, isVisible }: AnimatedListProps) => {
	return (
		<AnimatePresence mode='wait'>{isVisible && children}</AnimatePresence>
	);
};
export default AnimatedList;
