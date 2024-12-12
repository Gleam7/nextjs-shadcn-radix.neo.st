import { AdminLayoutHeader } from './admin-layout-header';
import { AdminLayoutFooter } from './admin-layout-footer';
import { AdminLayoutMain } from './admin-layout-main';

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<AdminLayoutHeader />
			<AdminLayoutMain>{children}</AdminLayoutMain>
			<AdminLayoutFooter />
		</>
	);
};
