import localFont from 'next/font/local';

import type { Metadata, Viewport } from 'next';

import { siteConfig } from '@/types';

import 'remixicon/fonts/remixicon.css';
import '@/public/styles/globals.css';

import { cn } from '@/lib/utils';

import { Toaster } from '@/components/shadcn-ui/sonner';
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
	weight: 'normal',
	style: 'normal',
});
const MoneygraphyRounded = localFont({
	src: '../public/fonts/Moneygraphy-Rounded.woff',
	variable: '--font-MoneygraphyRounded',
	weight: 'normal',
	style: 'normal',
});
const OmyuPretty = localFont({
	src: '../public/fonts/omyu_pretty.woff2',
	variable: '--font-OmyuPretty',
	weight: 'normal',
	style: 'normal',
});
const SejongGeulggot = localFont({
	src: '../public/fonts/SejongGeulggot.woff2',
	variable: '--font-SejongGeulggot',
	weight: 'normal',
	style: 'normal',
});
const SUIT = localFont({
	src: '../public/fonts/SUIT-Variable.woff2',
	variable: '--font-SUIT',
	weight: '100 900',
	style: 'normal',
});
const D2Coding = localFont({
	src: '../public/fonts/D2Coding.woff',
	variable: '--font-D2Coding',
	weight: 'normal',
	style: 'normal',
});

const MaterialIcons = localFont({
	src: '../public/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
	variable: '--font-MaterialIcons',
	weight: '400',
});

const baseUrl = new URL(
	process.env.APP_URL
		? `${process.env.APP_URL}`
		: process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}`
		: `http://localhost:${process.env.PORT || 3000}`
);
const imageUrl = 'https://ui.shadcn.com/og.jpg';
export const metadata: Metadata = {
	metadataBase: baseUrl,
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	authors: siteConfig.authors,
	creator: siteConfig.authors[0].name,
	description: siteConfig.description,
	keywords: siteConfig.keywords,
	icons: {
		icon: '/favicon.ico',
		//icon: [
		//	{
		//		media: '(prefers-color-scheme: light)',
		//		url: '/favicon-light.svg',
		//		href: '/favicon-light.svg',
		//	},
		//	{
		//		media: '(prefers-color-scheme: dark)',
		//		url: '/favicon-dark.svg',
		//		href: '/favicon-dark.svg',
		//	},
		//],
		//shortcut: '/favicon-16x16.png',
		//apple: '/apple-touch-icon.png',
	},
	manifest: `${baseUrl}/site.webmanifest`,
	alternates: {
		canonical: '/',
	},
	openGraph: {
		url: baseUrl,
		title: siteConfig.name,
		description: siteConfig.description,
		type: 'website',
		images: {
			url: imageUrl,
			alt: siteConfig.name,
			secureUrl: imageUrl,
			//type: string | undefined;
			width: 1200,
			height: 630,
		},
	},
	twitter: {
		card: 'summary_large_image',
		creator: siteConfig.authors[0].name,
		images: {
			url: imageUrl,
			alt: siteConfig.name,
			secureUrl: imageUrl,
			//type: string | undefined;
			width: 1200,
			height: 630,
		},
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
	<meta name="next-size-adjust" />
	<meta name="theme-color" content="#ffffff" />
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
					JalHaru.variable,
					SejongGeulggot.variable,
					SUIT.variable,
					D2Coding.variable,
					MaterialIcons.variable
				)}
			>
				<Provider attribute="class" defaultTheme="system" enableSystem>
					{children}
				</Provider>
				<Toaster richColors />
			</body>
		</html>
	);
}
