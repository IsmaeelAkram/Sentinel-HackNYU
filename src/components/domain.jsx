export default function Domain({ domain, lastChecked }) {
	return (
		<div className="domain">
			<p>{domain}</p>
			<p className="last-checked">
				Last checked <span className="checked-time">{lastChecked}</span>
			</p>
		</div>
	);
}
