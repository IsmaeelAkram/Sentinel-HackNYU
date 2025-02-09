export default function Domain({ domain, lastChecked }) {
	return (
		<div className="domain">
			<p>{domain}</p>
			<p className="last-checked">
				Last scanned <span className="checked-time">{lastChecked}</span>
			</p>
		</div>
	);
}
