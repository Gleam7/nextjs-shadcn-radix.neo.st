import * as React from 'react';

const NoBillsFound = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg width={100} height={100} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect width={100} height={100} fill="white" />
			<path
				d="M35 27C35 23.134 38.134 20 42 20H70C73.866 20 77 23.134 77 27V69C77 72.866 73.866 76 70 76H62.3H42C38.134 76 35 72.866 35 69V27Z"
				fill="white"
				stroke="#56428D"
				strokeWidth={2}
				strokeLinejoin="round"
			/>
			<path
				d="M20 33C20 29.134 23.134 26 27 26H63C66.866 26 70 29.134 70 33V76.25C70 81.0825 66.0825 85 61.25 85C56.4175 85 52.5 81.0825 52.5 76.25V71H20V33Z"
				fill="white"
				stroke="#56428D"
				strokeWidth={2}
				strokeLinejoin="round"
			/>
			<path
				d="M25 86H61L59.4878 85.5274C55.5721 84.3038 52.8009 80.8126 52.4979 76.7214L52 70H20.5H19C16.7909 70 15 71.7909 15 74V76C15 81.5228 19.4772 86 25 86Z"
				fill="#56428D"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M10.25 78C11.2165 78 12 78.7835 12 79.75V80C12 84.9706 16.0294 89 21 89H23.3C24.2389 89 25 89.7611 25 90.7V90.7C25 91.6389 24.2389 92.4 23.3 92.4H21C13.8203 92.4 8.5 87.1797 8.5 80V79.75C8.5 78.7835 9.2835 78 10.25 78V78Z"
				stroke="#56428D"
				strokeWidth={2}
				strokeLinejoin="round"
			/>
			<path
				d="M27 53.5C27 52.6716 27.6716 52 28.5 52H43.5C44.3284 52 45 52.6716 45 53.5V53.5C45 54.3284 44.3284 55 43.5 55H28.5C27.6716 55 27 54.3284 27 53.5V53.5Z"
				stroke="#56428D"
				strokeWidth={2}
				strokeLinejoin="round"
			/>
			<path
				d="M34.8145 47.2715C34.6504 47.2715 34.5303 47.2334 34.4541 47.1572C34.3779 47.0811 34.3398 46.9609 34.3398 46.7969V46.1113C33.6602 46.0879 33.0654 46.0029 32.5557 45.8564C32.0518 45.7041 31.665 45.5254 31.3955 45.3203C31.1318 45.1152 31 44.9219 31 44.7402C31 44.5879 31.0557 44.4004 31.167 44.1777C31.2842 43.9551 31.4219 43.7646 31.5801 43.6064C31.7383 43.4424 31.8701 43.3604 31.9756 43.3604C32.0459 43.3604 32.1924 43.4189 32.415 43.5361C32.7314 43.6943 33.0391 43.8232 33.3379 43.9229C33.6426 44.0225 33.9766 44.0723 34.3398 44.0723V41.4971C33.6777 41.251 33.1416 41.0195 32.7314 40.8027C32.3271 40.5801 31.9727 40.2549 31.668 39.8271C31.3691 39.3936 31.2197 38.8311 31.2197 38.1396C31.2197 37.4834 31.3604 36.9297 31.6416 36.4785C31.9287 36.0215 32.3066 35.6699 32.7754 35.4238C33.25 35.1777 33.7715 35.0225 34.3398 34.958V34.4658C34.3398 34.3018 34.375 34.1846 34.4453 34.1143C34.5156 34.0381 34.6211 34 34.7617 34C34.9316 34 35.0518 34.0352 35.1221 34.1055C35.1924 34.1758 35.2275 34.2959 35.2275 34.4658V34.9492C35.7021 34.9668 36.1299 35.0312 36.5107 35.1426C36.8975 35.2539 37.1963 35.3887 37.4072 35.5469C37.624 35.7051 37.7324 35.8633 37.7324 36.0215C37.7324 36.1621 37.6855 36.3438 37.5918 36.5664C37.498 36.7832 37.3838 36.9736 37.249 37.1377C37.1201 37.3018 36.9971 37.3838 36.8799 37.3838C36.833 37.3838 36.7363 37.3545 36.5898 37.2959C36.3789 37.2139 36.1709 37.1465 35.9658 37.0938C35.7666 37.041 35.5205 37.0088 35.2275 36.9971V39.3701C35.8721 39.6514 36.3848 39.9033 36.7656 40.126C37.1465 40.3486 37.4805 40.668 37.7676 41.084C38.0547 41.4941 38.1982 42.0156 38.1982 42.6484C38.1982 43.3809 38.0605 43.9961 37.7852 44.4941C37.5156 44.9863 37.1582 45.3613 36.7129 45.6191C36.2676 45.8711 35.7725 46.0264 35.2275 46.085V46.7969C35.2275 46.9609 35.1924 47.0811 35.1221 47.1572C35.0576 47.2334 34.9551 47.2715 34.8145 47.2715ZM34.3398 37.085C34.0352 37.1611 33.8242 37.2783 33.707 37.4365C33.5898 37.5889 33.5312 37.7471 33.5312 37.9111C33.5312 38.1338 33.5986 38.3271 33.7334 38.4912C33.874 38.6553 34.0762 38.8135 34.3398 38.9658V37.085ZM35.2275 43.8965C35.4326 43.8145 35.5967 43.6943 35.7197 43.5361C35.8428 43.3779 35.9043 43.1787 35.9043 42.9385C35.9043 42.5166 35.6787 42.1768 35.2275 41.9189V43.8965Z"
				fill="#56428D"
			/>
			<rect x={27} y={60} width={33} height={3} rx={1.5} stroke="#56428D" strokeWidth={2} strokeLinejoin="round" />
			<circle cx={69} cy={33} r={13} fill="white" stroke="#56428D" strokeWidth={2} />
			<path
				d="M67.5 26.5C67.5 25.6716 68.1716 25 69 25V25C69.8284 25 70.5 25.6716 70.5 26.5V32.5C70.5 33.3284 69.8284 34 69 34V34C68.1716 34 67.5 33.3284 67.5 32.5V26.5Z"
				stroke="#56428D"
				strokeWidth={2}
				strokeLinejoin="round"
			/>
			<path
				d="M67.5 39.5C67.5 40.3284 68.1716 41 69 41V41C69.8284 41 70.5 40.3284 70.5 39.5V39.5C70.5 38.6716 69.8284 38 69 38V38C68.1716 38 67.5 38.6716 67.5 39.5V39.5Z"
				stroke="#56428D"
				strokeWidth={2}
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default NoBillsFound;