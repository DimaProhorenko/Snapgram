import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { FilterButton, Loader } from '@/components/shared';
import {
	useGetInfinitePosts,
	useSearchPosts,
} from '@/lib/react-query/queriesAndMutations';
import useDebounce from '@/hooks/useDebounce';
import { GridPostsList } from '@/components/posts';
import { SearchResult } from '@/components/Search';
import { useInView } from 'react-intersection-observer';
import Page from '@/components/routes/Page';

const Explore = () => {
	const [searchValue, setSearchValue] = useState('');
	const debouncedValue = useDebounce(searchValue, 500);
	const { ref, inView } = useInView();

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isPending: isInfiniteLoading,
	} = useGetInfinitePosts();
	const { data: searchResult, isFetching: isSearchingPosts } =
		useSearchPosts(debouncedValue);

	const posts = data?.pages[0]?.documents;
	const searchedPosts = searchResult?.documents;

	const shouldShowSearchResults = searchValue !== '';
	const shouldShowFeaturedResults = !searchValue;

	useEffect(() => {
		if (inView && !searchValue) {
			fetchNextPage();
		}
	}, [inView, searchValue, isInfiniteLoading, fetchNextPage]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	return (
		<Page>
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
					<div className='flex justify-between items-center w-full max-w-5xl mt-16 mb-7 sticky top-14 bg-dark-2 md:top-0 z-30 py-2'>
						<h3 className='body-bold md:h3-bold'>Popular Today</h3>
						<FilterButton />
					</div>

					<div>
						{(isInfiniteLoading || isSearchingPosts) && <Loader />}
						{!isInfiniteLoading &&
							shouldShowFeaturedResults &&
							posts && <GridPostsList posts={posts} />}
						{!isSearchingPosts &&
							shouldShowSearchResults &&
							searchedPosts && (
								<SearchResult posts={searchedPosts} />
							)}
					</div>
				</div>

				{hasNextPage && !searchValue && (
					<div ref={ref} className='mt-10'>
						<Loader />
					</div>
				)}
			</div>
		</Page>
	);
};
export default Explore;
