import { Models } from 'appwrite';
import { GridPostsList } from '../posts';

type SearchResultProps = {
	posts: Models.Document[];
};

const SearchResult = ({ posts }: SearchResultProps) => {
	return <GridPostsList posts={posts} />;
};
export default SearchResult;
