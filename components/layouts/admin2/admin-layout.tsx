import { AdminLayoutHeader } from '../admin/admin-layout-header';
import { AdminLayoutFooter } from '../admin/admin-layout-footer';
import { AdminLayoutMain } from './admin-layout-main';

export const AdminLayout2 = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<AdminLayoutHeader />
			<AdminLayoutMain>{children}</AdminLayoutMain>
			<AdminLayoutFooter />
		</>
	);
};
