import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();

	const diff = Math.abs(now.getTime() - date.getTime());
	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);

	if (months > 0) {
		return date.toISOString().slice(0, 10);
	} else {
		if (days > 0) {
			return `${convertToPlural(days, 'day')} ago`;
		} else if (hours > 0) {
			return `${convertToPlural(hours, 'hour')} ago`;
		} else if (minutes > 0) {
			return `${convertToPlural(minutes, 'minute')} ago`;
		} else {
			return 'Just now';
		}
	}
}

export function convertToPlural(count: number, str: string): string {
	if (count === 1) {
		return `${count} ${str}`;
	}
	return `${count} ${str}s`;
}
