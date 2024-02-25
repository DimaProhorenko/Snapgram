type LoaderType = {
	width?: number;
	height?: number;
};

const Loader = ({ width = 24, height = 24 }: LoaderType) => {
	return (
		<div className='flex items-center justify-center w-full'>
			<img
				src='/assets/icons/loader.svg'
				alt='Loading'
				width={width}
				height={height}
			/>
		</div>
	);
};
export default Loader;
