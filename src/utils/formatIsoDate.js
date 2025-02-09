import { formatDistanceToNow, parseISO } from 'date-fns';

export default function formatIsoDate(isoDate) {
	// Parse the ISO date string into a Date object
	const date = parseISO(isoDate);

	// Get the relative time from now
	const relativeTime = formatDistanceToNow(date, { addSuffix: true });

	return relativeTime;
}
