'use client';

import { useForm } from 'react-hook-form';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';
import { Toaster } from '@/components/shadcn-ui/sonner';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Button,
	Input,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	PasswordInput,
} from '@/components/shadcn-ui';
import { siteConfig } from '@/types';

// Improved schema with additional validation rules
const formSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters long' })
		.regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
});

export default function SigninPreview() {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			//email: '',
			//password: '',
			email: siteConfig.admin_id,
			password: siteConfig.admin_id,
		},
	});
	async function onSubmit(values: z.infer<typeof formSchema>) {
		//console.log(values);
		try {
			// Assuming an async Signin function
			//toast(
			//	<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
			//		<code className="text-white">{JSON.stringify(values, null, 4)}</code>
			//	</pre>
			//);

			const response = await signIn('credentials', {
				email: values.email,
				password: values.password,
				redirect: false,
				callbackUrl: '/demo/about', // URL to redirect to after successful login
			});
			console.log('Login response: ', response);
			if (response?.ok) {
				toast('Login success!', {
					description: <div>Hello User 👋</div>,
					//action: {
					//	label: 'Undo',
					//	onClick: () => console.log('Undo'),
					//},
				});
				setTimeout(() => {
					router.push('/demo');
				}, 1500);
			} else {
				throw new Error(response?.error || 'error');
			}
			//toast('Event has been created', {
			//	description: (
			//		<pre className="mt-2 w-full p-4">
			//			<code className="text-white">{JSON.stringify(values, null, 4)}</code>
			//		</pre>
			//	),
			//	//action: {
			//	//	label: 'Undo',
			//	//	onClick: () => console.log('Undo'),
			//	//},
			//});
		} catch (error) {
			console.error('Form submission error', error);
			//toast.error('Failed to submit the form. Please try again.');
			toast.error('Failed to submit the form. Please try again.', {
				description: (
					<pre className="mt-2 w-full p-4">
						<code className="text-white">{JSON.stringify(values, null, 4)}</code>
					</pre>
				),
			});
		}
	}

	return (
		<div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Signin</CardTitle>
					<CardDescription>Enter your email and password to Signin to your account.</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div className="grid gap-4">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormLabel htmlFor="email">Email</FormLabel>
											<FormControl>
												<Input id="email" placeholder="johndoe@mail.com" type="email" autoComplete="email" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<div className="flex justify-between items-center">
												<FormLabel htmlFor="password">Password</FormLabel>
												<Link href="#" className="ml-auto inline-block text-sm underline">
													Forgot your password?
												</Link>
											</div>
											<FormControl>
												<PasswordInput id="password" placeholder="******" autoComplete="current-password" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full">
									Signin
								</Button>
								{/* 
								<Button variant="outline" className="w-full">
									Signin with Google
								</Button>
								*/}
							</div>
						</form>
					</Form>
					{/* 
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{' '}
						<Link href="#" className="underline">
							Sign up
						</Link>
					</div>
					*/}
				</CardContent>
			</Card>
			<Toaster />
		</div>
	);
}
