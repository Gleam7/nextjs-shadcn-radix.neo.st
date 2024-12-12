export declare module 'next-auth' {
	interface User {
		accessToken: string;
	}
	interface Session {
		accessToken: string;

		user: {
			token?: JWT;
			role?: string[];
		} & DefaultSession['user'];
	}
}
export declare module '@auth/core/jwt' {
	interface JWT {
		accessToken: string;
	}
}
