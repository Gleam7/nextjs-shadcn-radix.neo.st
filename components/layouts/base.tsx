import { cn } from '@/lib/utils';

export function BaseLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const base_class_names = ['flex', 'items-center'];
	const base_class_names_2 = cn(base_class_names, 'justify-between');

	const class_names_for_header = cn(base_class_names_2, 'bg-red-300/30');
	const class_names_for_header_hgroup = cn(base_class_names, 'justify-start', 'bg-red-300/30');
	const class_names_for_header_nav = cn(base_class_names, 'justify-end', 'bg-red-300/30');
	const class_names_for_header_nav_ul = cn(base_class_names, 'justify-center', 'gap-4', 'bg-red-300/30');

	const class_names_for_footer = cn(base_class_names_2, 'bg-violet-300/30');

	const class_names_for_main = cn(base_class_names_2, 'mx-auto', 'bg-blue-300/30');
	const class_names_for_main_section = cn(base_class_names, 'mx-auto py-4', 'bg-yellow-300/30');
	const class_names_for_main_section_article = cn(base_class_names, '', 'bg-purple-300/50');
	const class_names_for_main_aside = cn(base_class_names, 'bg-green-300/30');

	return (
		<>
			<header className={class_names_for_header}>
				<hgroup className={class_names_for_header_hgroup}>
					<h1>Header</h1>
					<h2>Subheader</h2>
				</hgroup>
				<nav className={class_names_for_header_nav}>
					<ul className={class_names_for_header_nav_ul}>
						<li>
							<a href="#">Nav item 1</a>
						</li>
						<li>
							<a href="#">Nav item 2</a>
						</li>
						<li>
							<a href="#">Nav item 3</a>
						</li>
					</ul>
				</nav>
			</header>
			<main className={class_names_for_main}>
				<section className={class_names_for_main_section}>
					<article className={class_names_for_main_section_article}>
						{/*
					<header>
						<h3>Article #1</h3>
					</header>
					<section>This is the first article.</section>
				</article>
				<article>
					<header>
						<h3>Article #2</h3>
					</header>
					<section>This is the second article.</section>
					*/}
						{children}
					</article>
				</section>
				<aside className={class_names_for_main_aside}>
					<section>
						<h3>Links</h3>
						<ul>
							<li>
								<a href="#">Link 1</a>
							</li>
							<li>
								<a href="#">Link 2</a>
							</li>
						</ul>
					</section>
					<figure className="">
						<figcaption className="">Foobar</figcaption>
					</figure>
				</aside>
			</main>
			<footer className={class_names_for_footer}>Footer</footer>
		</>
	);
}
