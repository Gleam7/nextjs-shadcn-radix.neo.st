import * as React from 'react';

const NoBlogsFound = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg width={100} height={100} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect width={100} height={100} fill="white" />
			<rect x={13} y={24} width={66.0462} height={53} rx={7} fill="white" stroke="#56428D" strokeWidth={2} />
			<circle cx={81} cy={55} r={13} fill="white" stroke="#56428D" strokeWidth={2} />
			<path
				d="M79.5 48.5C79.5 47.6716 80.1716 47 81 47V47C81.8284 47 82.5 47.6716 82.5 48.5V54.5C82.5 55.3284 81.8284 56 81 56V56C80.1716 56 79.5 55.3284 79.5 54.5V48.5Z"
				stroke="#56428D"
				strokeWidth={2}
				strokeLinejoin="round"
			/>
			<path
				d="M79.5 61.5C79.5 62.3284 80.1716 63 81 63V63C81.8284 63 82.5 62.3284 82.5 61.5V61.5C82.5 60.6716 81.8284 60 81 60V60C80.1716 60 79.5 60.6716 79.5 61.5V61.5Z"
				stroke="#56428D"
				strokeWidth={2}
				strokeLinejoin="round"
			/>
			<path d="M13.4082 36.231H78.639" stroke="#56428D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
			<circle cx={21.5} cy={30.5} r={2.5} fill="#56428D" />
			<circle cx={28.5} cy={30.5} r={2.5} fill="#56428D" />
			<path
				d="M20 47.5C20 46.6716 20.6716 46 21.5 46H36.5C37.3284 46 38 46.6716 38 47.5C38 48.3284 37.3284 49 36.5 49H21.5C20.6716 49 20 48.3284 20 47.5Z"
				fill="#56428D"
				stroke="#56428D"
				strokeWidth={2}
				strokeLinejoin="round"
			/>
			<rect x={20} y={54} width={33} height={3} rx={1.5} fill="#56428D" stroke="#56428D" strokeWidth={2} strokeLinejoin="round" />
			<rect x={20} y={62} width={33} height={3} rx={1.5} fill="#56428D" stroke="#56428D" strokeWidth={2} strokeLinejoin="round" />
			<path
				d="M43.6346 15.5C42.7318 15.5 42 16.2318 42 17.1346V17.1346C42 18.0373 42.7318 18.7692 43.6346 18.7692L49.0544 18.7692C49.9572 18.7692 50.689 18.0373 50.689 17.1346V17.1346C50.689 16.2318 49.9572 15.5 49.0544 15.5L43.6346 15.5Z"
				stroke="#56428D"
				strokeWidth={2}
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default NoBlogsFound;
