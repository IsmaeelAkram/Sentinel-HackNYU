export default function Home() {
	return (
		<div className="w-screen h-screen flex flex-col justify-center items-center">
			<img src="/name.svg" alt="Sentinel" className="sm:w-1/3 w-1/2" />
			<h2 className="text-3xl text-center sm:w-1/3 w-1/2">Safeguarding your data on the web</h2>
			<a href="https://devpost.com/software/sentinel-privacy-extension" className="mt-10 underline">
				View more details on Devpost
			</a>
			<a href="/sentinel.crx">
				<button className="mt-10 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-xl">
					Add to Chrome
				</button>
			</a>
			<p className="sm:w-1/3 w-1/2 text-center mt-2">
				You must enable 'Developer mode' on the Extensions panel to install Sentinel.
			</p>
		</div>
	);
}
