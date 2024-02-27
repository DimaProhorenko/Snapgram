import { AnimatePresence } from 'framer-motion';

type LocationProviderProps = {
	children: React.ReactNode;
};

const LocationProvider = ({ children }: LocationProviderProps) => {
	return <AnimatePresence mode='wait'>{children}</AnimatePresence>;
};
export default LocationProvider;
