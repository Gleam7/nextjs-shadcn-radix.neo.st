import * as React from 'react';

const NoAddCards = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg width={100} height={100} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect width={100} height={100} fill="white" />
			<path
				d="M25 30C25 26.6863 27.6863 24 31 24H79C82.3137 24 85 26.6863 85 30V63C85 66.3137 82.3137 69 79 69H31C27.6863 69 25 66.3137 25 63V30Z"
				fill="white"
				stroke="#56428D"
				strokeWidth={2}
			/>
			<path
				d="M82 75.6346C82 74.7318 82.7318 74 83.6346 74V74C84.5373 74 85.2692 74.7318 85.2692 75.6346V81.0544C85.2692 81.9572 84.5373 82.689 83.6346 82.689V82.689C82.7318 82.689 82 81.9572 82 81.0544V75.6346Z"
				stroke="#56428D"
				strokeWidth={2}
				strokeLinejoin="round"
			/>
			<path
				d="M15 19.6346C15 18.7318 15.7318 18 16.6346 18V18C17.5373 18 18.2692 18.7318 18.2692 19.6346V25.0544C18.2692 25.9572 17.5373 26.689 16.6346 26.689V26.689C15.7318 26.689 15 25.9572 15 25.0544V19.6346Z"
				stroke="#56428D"
				strokeWidth={2}
				strokeLinejoin="round"
			/>
			<path
				d="M16 38C16 34.6863 18.6863 32 22 32H70C73.3137 32 76 34.6863 76 38V71C76 74.3137 73.3137 77 70 77H22C18.6863 77 16 74.3137 16 71V38Z"
				fill="white"
				stroke="#56428D"
				strokeWidth={2}
			/>
			<path d="M16 43L16 49L76 49L76 43L16 43Z" fill="#56428D" />
			<circle cx={75} cy={34} r={13} fill="white" stroke="#56428D" strokeWidth={2} />
			<path
				d="M73.5 27.5C73.5 26.6716 74.1716 26 75 26V26C75.8284 26 76.5 26.6716 76.5 27.5V33.5C76.5 34.3284 75.8284 35 75 35V35C74.1716 35 73.5 34.3284 73.5 33.5V27.5Z"
				stroke="#56428D"
				strokeWidth={2}
				strokeLinejoin="round"
			/>
			<path
				d="M73.5 40.5C73.5 41.3284 74.1716 42 75 42V42C75.8284 42 76.5 41.3284 76.5 40.5V40.5C76.5 39.6716 75.8284 39 75 39V39C74.1716 39 73.5 39.6716 73.5 40.5V40.5Z"
				stroke="#56428D"
				strokeWidth={2}
				strokeLinejoin="round"
			/>
			<path
				d="M40.5 59C39.6716 59 39 59.6716 39 60.5V60.5C39 61.3284 39.6716 62 40.5 62L67.5 62C68.3284 62 69 61.3284 69 60.5V60.5C69 59.6716 68.3284 59 67.5 59L40.5 59Z"
				stroke="#56428D"
				strokeWidth={2}
				strokeLinejoin="round"
			/>
			<circle cx={27.5} cy={60.5} r={4.5} fill="#56428D" />
		</svg>
	);
};

export default NoAddCards;
