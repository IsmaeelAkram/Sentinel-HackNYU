import Domain from './components/domain';
import './App.css';

function App() {
	return (
		<div className="container flex justify-center items-center">
			<img src="/name.svg" alt="name" className="name" />
			<Domain domain="facebook.com" lastChecked="2 hours ago" />
		</div>
	);
}

export default App;
