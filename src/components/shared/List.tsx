import { Listable } from '@/types';

interface ListType<T extends Listable> {
	items: T[];
	// eslint-disable-next-line no-unused-vars
	render: (item: T) => React.ReactNode;
	className?: string;
}
const List = <T extends Listable>({
	items,
	render,
	className = '',
}: ListType<T>) => {
	return (
		<ul className={className}>
			{items.map((item: T) => (
				<li key={item.id}>{render(item)}</li>
			))}
		</ul>
	);
};
export default List;
