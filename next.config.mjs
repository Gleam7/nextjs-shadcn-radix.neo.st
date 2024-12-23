/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				// Force disable caching for any NextAuth api routes. We need to do this because by default
				// these API endpoints do not return a Cache-Control header. If the header is missing, FrontDoor
				// CDN **will** cache the pages, which is a security risk and can return the wrong user:
				// https://docs.microsoft.com/en-us/azure/frontdoor/front-door-caching#cache-expiration
				source: '/api/auth/:path*',
				headers: [
					{ key: 'Cache-Control', value: 'private, no-store, no-cache, must-revalidate, max-age=0' },
					{ key: 'Pragma', value: 'no-cache' },
				],
			},
		];
	},

	//output: 'export',
	experimental: {
		urlImports: ['https://fonts.googleapis.com'],
	},
};

export default nextConfig;
