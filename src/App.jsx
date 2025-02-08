/*global chrome*/
import Domain from './components/domain';
import './App.css';
import Score from './components/score';
import { useEffect, useState } from 'react';

function App() {
	const [score, setScore] = useState(0);
	const [ip, setIp] = useState('Loading...');
	const [isProtected, setIsProtected] = useState(false);
	const [isp, setIsp] = useState('Loading...');
	const [domain, setDomain] = useState('—');

	useEffect(() => {
		(async () => {
			const res = await fetch('https://checkip.amazonaws.com');
			const data = await res.text();
			setIp(data);

			// const res = await fetch('https://t3jc7d49gc.execute-api.us-east-1.amazonaws.com/Prod/');
			// const data = await res.json();
			// const protectionData = data.protection;
			// setIp(protectionData.ip);
			// setIsProtected(protectionData.protected);
			// setIsp(protectionData.isp);
		})();
	}, []);

	useEffect(() => {
		try {
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				// since only one tab should be active and in the current window at once
				// the return variable should only have one entry
				var activeTab = tabs[0];
				var activeTabUrl = activeTab.url;
				const domain = new URL(activeTabUrl).hostname;
				setDomain(domain);
			});
		} catch (error) {
			console.log('Not in chrome');
			setDomain('facebook.com');
		}
	}, []);

	useEffect(() => {}, [domain]);

	useEffect(() => {
		const interval = setInterval(() => {
			setScore((prev) => (prev + 1) % 101);
		}, 10);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="container flex justify-center items-center">
			<img src="/name.svg" alt="name" className="name" />
			<p className="ip">
				Your IP: <strong className="address">{ip}</strong>
			</p>
			<span className="protection">
				{isProtected ? (
					<span className="green">Protected</span>
				) : (
					<>
						<span className="red">Exposed!</span> <a href="https://nordvpn.com">Use a VPN</a>
					</>
				)}
			</span>
			<Domain domain={domain} lastChecked="2 hours ago" />
			<Score score={score} />
		</div>
	);
}

export default App;
