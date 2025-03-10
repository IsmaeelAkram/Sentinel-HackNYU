function getArrowRotation(score) {
	return (score / 100) * 180;
}

function getColor(score) {
	if (score <= 33) {
		return '#FF471D';
	} else if (score <= 66) {
		return '#F8B830';
	} else {
		return '#58D31B';
	}
}

export default function Score({ score }) {
	return (
		<div className="meter">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="217"
				height="217"
				viewBox="0 0 217 217"
				fill="none"
			>
				<mask id="path-1-inside-1_1_43" fill="white">
					<path d="M-5.77342e-06 108.5C-4.52778e-06 94.2516 2.80643 80.1427 8.25907 66.9788C13.7117 53.815 21.7038 41.8541 31.7789 31.7789C41.8541 21.7038 53.815 13.7117 66.9789 8.25907C80.1427 2.80644 94.2516 3.90496e-06 108.5 5.77342e-06C122.748 7.64187e-06 136.857 2.80644 150.021 8.25908C163.185 13.7117 175.146 21.7038 185.221 31.7789C195.296 41.8541 203.288 53.815 208.741 66.9789C214.194 80.1427 217 94.2516 217 108.5L163.933 108.5C163.933 101.22 162.499 94.0121 159.714 87.2867C156.928 80.5612 152.845 74.4503 147.697 69.3029C142.55 64.1554 136.439 60.0723 129.713 57.2865C122.988 54.5007 115.78 53.0669 108.5 53.0669C101.22 53.0669 94.0121 54.5007 87.2867 57.2865C80.5612 60.0723 74.4503 64.1554 69.3029 69.3029C64.1554 74.4503 60.0723 80.5612 57.2865 87.2867C54.5007 94.0121 53.0669 101.22 53.0669 108.5L-5.77342e-06 108.5Z" />
				</mask>
				<path
					d="M-5.77342e-06 108.5C-4.52778e-06 94.2516 2.80643 80.1427 8.25907 66.9788C13.7117 53.815 21.7038 41.8541 31.7789 31.7789C41.8541 21.7038 53.815 13.7117 66.9789 8.25907C80.1427 2.80644 94.2516 3.90496e-06 108.5 5.77342e-06C122.748 7.64187e-06 136.857 2.80644 150.021 8.25908C163.185 13.7117 175.146 21.7038 185.221 31.7789C195.296 41.8541 203.288 53.815 208.741 66.9789C214.194 80.1427 217 94.2516 217 108.5L163.933 108.5C163.933 101.22 162.499 94.0121 159.714 87.2867C156.928 80.5612 152.845 74.4503 147.697 69.3029C142.55 64.1554 136.439 60.0723 129.713 57.2865C122.988 54.5007 115.78 53.0669 108.5 53.0669C101.22 53.0669 94.0121 54.5007 87.2867 57.2865C80.5612 60.0723 74.4503 64.1554 69.3029 69.3029C64.1554 74.4503 60.0723 80.5612 57.2865 87.2867C54.5007 94.0121 53.0669 101.22 53.0669 108.5L-5.77342e-06 108.5Z"
					fill="url(#paint0_linear_1_43)"
					stroke="white"
					stroke-width="6"
					mask="url(#path-1-inside-1_1_43)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_1_43"
						x1="-38.5"
						y1="66"
						x2="256.5"
						y2="66"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#FF1515" />
						<stop offset="0.5" stop-color="#FFB631" />
						<stop offset="1" stop-color="#00E20F" />
					</linearGradient>
				</defs>
			</svg>
			<div
				className="arrow"
				style={{
					transform: `translateY(-120px) translateX(-45px) rotate(${getArrowRotation(score)}deg)`,
				}}
			></div>
			<div className="under">
				<h2>Privacy Score</h2>
				<p className="fraction">
					<span className="numerator" style={{ color: getColor(score) }}>
						{score}
					</span>
					/100
				</p>
			</div>
		</div>
	);
}
