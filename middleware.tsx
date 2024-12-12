import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// List of paths related to authentication processing
const authPage = ['/signin', '/signup'];

// List of public paths
const publicRoutes = ['/about', '/blog', '/demo', '/pricing'];

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const isAuthRoute = authPage.includes(path);
	const routeIdx = publicRoutes.findIndex((route) => {
		//console.log('path: ', path, ', route: ', route, ', path.startsWith(route): ', path.startsWith(route));
		return path === '/' || path.startsWith(route);
	}, path);
	//const isPublicRoute = publicRoutes.includes(path);
	const isPublicRoute = routeIdx > -1;
	//console.log('path: ', path, ',routeIdx: ', routeIdx, ', isAuthRoute:', isAuthRoute, ', isPublicRoute : ', isPublicRoute);

	// Get session and extract user role
	const session = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	});
	//console.log('session: ', session);

	const is_logged_in = session?.email?.length || -1 > 0;

	if (isAuthRoute && is_logged_in) {
		console.log('Already signed-in');
		return NextResponse.redirect(new URL('/', request.nextUrl));
	}

	if (isAuthRoute || isPublicRoute || is_logged_in) {
		// When the user is authenticated
		// Add a new header x-current-path which passes the path to downstream components
		const headers = new Headers(request.headers);
		headers.set('x-current-path', request.nextUrl.pathname);
		return NextResponse.next({ headers });
	} else {
		console.log('Goto signin page');
		// If user is not authenticated, redirect to /signin
		return NextResponse.redirect(new URL('/signin', request.nextUrl));
	}
}

export const config = {
	matcher: [
		// match all routes except static files and APIs
		'/((?!api|_next/static|fonts|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$).*)',
	],
};
