import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';

const FilterButton = () => {
	return (
		<Popover>
			<PopoverTrigger className='flex gap-2 items-center border border-dark-4 p-2 rounded-lg'>
				All{' '}
				<img
					src='/assets/icons/filter.svg'
					alt='search'
					width={20}
					height={20}
				/>
			</PopoverTrigger>
			<PopoverContent className='border-dark-4 w-fit'>
				Content
			</PopoverContent>
		</Popover>
	);
};
export default FilterButton;
