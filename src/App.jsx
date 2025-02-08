import Domain from './components/domain';
import './App.css';
import Score from './components/score';
import { useEffect, useState } from 'react';

function App() {
	const [score, setScore] = useState(0);
	const [ip, setIp] = useState('Loading...');
	const [isProtected, setIsProtected] = useState(false);
	const [isp, setIsp] = useState('Loading...');

	useEffect(() => {
		(async () => {
			const res = await fetch('https://checkip.amazonaws.com');
			const data = await res.text();
			setIp(data);
			// const res = await fetch('https://web-api.nordvpn.com/v1/ips/info');
			// const data = await res.json();
			// setIp(data.ip);
			// setIsProtected(data.protected);
			// setIsp(data.isp);
		})();
	}, []);

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
			<Domain domain="facebook.com" lastChecked="2 hours ago" />
			<Score score={score} />
		</div>
	);
}

export default App;
