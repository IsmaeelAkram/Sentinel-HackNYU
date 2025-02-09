import './globals.css';

export const metadata = {
	title: 'Sentinel - Safeguarding your data on the web',
	description:
		"Over the past few years, there have been many controversies surrounding our favorite websites. We trust them with our time, but we can't trust them with our data. Sentinel aims to clarify how websites are handling our data, without users needing to read lengthy privacy policies.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`antialiased`}>{children}</body>
		</html>
	);
}
