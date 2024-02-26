import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { FilterButton, Loader } from '@/components/shared';
import {
	useGetInfinitePosts,
	useSearchPosts,
} from '@/lib/react-query/queriesAndMutations';
import PostsList from '@/components/posts/PostsList';
import useDebounce from '@/hooks/useDebounce';

const Explore = () => {
	const [searchValue, setSearchValue] = useState('');
	const debouncedValue = useDebounce(searchValue, 500);

	const { data, fetchNextPage, hasNextPage, isPending } =
		useGetInfinitePosts();
	// const { data: searchedPosts } = useSearchPosts(debouncedValue);
	// console.log(searchedPosts);

	const posts = data?.pages[0]?.documents;

	console.log(posts);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	return (
		<div className='explore-container'>
			<div className='explore-inner_container'>
				<h2 className='h3-bold md:h2-bold w-full'>Explore</h2>
				<div className='w-full bg-dark-4 rounded-lg px-4 flex'>
					<img
						src='/assets/icons/search.svg'
						alt='Search'
						width={20}
						height={20}
					/>
					<Input
						type='text'
						placeholder='Search'
						value={searchValue}
						onChange={handleSearchChange}
						className='explore-search'
					/>
				</div>
				<div className='flex justify-between items-center w-full max-w-5xl mt-16 mb-7 sticky top-14 bg-dark-2 md:top-0 py-2'>
					<h3 className='body-bold md:h3-bold'>Popular Today</h3>
					<FilterButton />
				</div>

				<div>
					{isPending && <Loader />}
					{!isPending && posts && <PostsList posts={posts} />}
				</div>
			</div>
		</div>
	);
};
export default Explore;
