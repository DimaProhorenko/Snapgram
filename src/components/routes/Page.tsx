import { anim, opacity } from '@/lib/animation';
import { motion } from 'framer-motion';

type PageProps = {
	children: React.ReactNode;
};

const Page = ({ children }: PageProps) => {
	return (
		<motion.div {...anim(opacity)} className='w-full'>
			{children}
		</motion.div>
	);
};
export default Page;
