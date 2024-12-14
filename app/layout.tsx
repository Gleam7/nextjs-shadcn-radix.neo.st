import localFont from 'next/font/local';

import type { Metadata, Viewport } from 'next';

import { siteConfig } from '@/types';

import 'remixicon/fonts/remixicon.css';
import '@/public/styles/globals.css';

import { cn } from '@/lib/utils';

import { Provider } from '@/components/layouts';

const geistSans = localFont({
	src: '../public/fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: '../public/fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

const JalHaru = localFont({
	src: '../public/fonts/Jal_Haru.woff',
	variable: '--font-JalHaru',
	weight: '100 900',
});
const MoneygraphyRounded = localFont({
	src: '../public/fonts/Moneygraphy-Rounded.woff',
	variable: '--font-MoneygraphyRounded',
	weight: '100 900',
});
const OmyuPretty = localFont({
	src: '../public/fonts/omyu_pretty.woff2',
	variable: '--font-OmyuPretty',
	weight: '100 900',
});

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.APP_URL
			? `${process.env.APP_URL}`
			: process.env.VERCEL_URL
			? `https://${process.env.VERCEL_URL}`
			: `http://localhost:${process.env.PORT || 3000}`
	),
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: '/favicon.ico',
	},
	alternates: {
		canonical: '/',
	},
	openGraph: {
		url: '/',
		title: siteConfig.name,
		description: siteConfig.description,
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.name,
		description: siteConfig.description,
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	viewportFit: 'cover',

	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
};
/*
// TODO:
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="author" href="https://shadcn.com" />
	<link rel="icon" href="/favicon.ico" />
	<link rel="manifest" href="https://ui.shadcn.com/site.webmanifest" />
	<link rel="shortcut icon" href="/favicon-16x16.png" />
	<meta charset="utf-8" />
	<meta name="author" content="shadcn" />
	<meta name="creator" content="shadcn" />
	<meta name="description" content="Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source." />
	<meta name="keywords" content="Next.js,React,Tailwind CSS,Server Components,Radix UI" />
	<meta name="next-size-adjust" />
	<meta name="theme-color" content="#ffffff" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@shadcn" />
	<meta name="twitter:description" content="Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source." />
	<meta name="twitter:image" content="https://ui.shadcn.com/og.jpg" />
	<meta name="twitter:title" content="shadcn/ui" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta property="og:description" content="Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source." />
	<meta property="og:image:alt" content="shadcn/ui" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image" content="https://ui.shadcn.com/og.jpg" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content="shadcn/ui" />
	<meta property="og:title" content="shadcn/ui" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://ui.shadcn.com" />
	<title>shadcn/ui</title>
*/
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={cn(
					'min-h-screen antialiased',
					//'bg-background font-sans',
					geistMono.variable,
					geistSans.variable,
					OmyuPretty.variable,
					MoneygraphyRounded.variable,
					JalHaru.variable
				)}
			>
				<Provider attribute="class" defaultTheme="system" enableSystem>
					{children}
				</Provider>
			</body>
		</html>
	);
}
