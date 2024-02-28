import { Variants } from 'framer-motion';

export const anim = (variants: Variants) => {
	return {
		initial: 'initial',
		animate: 'enter',
		exit: 'exit',
		variants,
	};
};

export const opacity = {
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

export const slide = {
	initial: {
		opacity: 0,
		x: 100,
	},
	enter: {
		opacity: 1,
		x: 0,
	},
	exit: {
		opacity: 0,
		x: 100,
	},
};

export const scaleOpacity = {
	initial: {
		scale: 0.8,
		opacity: 0,
	},
	enter: {
		scale: 1,
		opacity: 1,
	},
};
