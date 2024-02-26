import { useState } from 'react';
import { Input } from '@/components/ui/input';

const Explore = () => {
	const [searchValue, setSearchValue] = useState('');

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	return (
		<div className='explore-container'>
			<div className='explore-inner_container'>
				<h2 className='h3-bold md:h2-bold w-full'>Explore</h2>
				<div className='w-full bg-dark-4 rounded-lg p-4 flex gap-1'>
					<img
						src='/assets/icons/search.svg'
						alt='Search'
						width={24}
						height={24}
					/>
					<Input
						type='text'
						placeholder='Search'
						value={searchValue}
						onChange={handleSearchChange}
						className='explore-search'
					/>
				</div>
			</div>
		</div>
	);
};
export default Explore;
