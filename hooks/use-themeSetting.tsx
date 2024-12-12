import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { StorageEnum, ThemeColorPresets, ThemeLayout, ThemeMode } from '@/types/enums';

type ThemeSettings = {
	themeColorPresets: ThemeColorPresets;
	themeMode: ThemeMode;
	themeLayout: ThemeLayout;
	themeCompact: boolean;
	themeStretch: boolean;
	breadCrumb: boolean;
	multiTab: boolean;
	darkSidebar: boolean;
};
type ThemeSettingStore = {
	settings: ThemeSettings;
	// Use the actions namespace to store all actions
	actions: {
		setSettings: (settings: ThemeSettings) => void;
		clearSettings: () => void;
	};
};

const useThemeSettingStore = create<ThemeSettingStore>()(
	persist(
		(set) => ({
			settings: {
				themeColorPresets: ThemeColorPresets.Default,
				themeMode: ThemeMode.System,
				themeLayout: ThemeLayout.Vertical,
				themeCompact: false,
				themeStretch: true,
				breadCrumb: true,
				multiTab: true,
				darkSidebar: false,
			},
			actions: {
				setSettings: (settings) => {
					set({ settings });
				},
				clearSettings() {
					useThemeSettingStore.persist.clearStorage();
				},
			},
		}),
		{
			name: 'theme_'.concat(StorageEnum.Settings), // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
			partialize: (state) => ({ [StorageEnum.Settings]: state.settings }),
		}
	)
);

export const useThemeSettings = () => useThemeSettingStore((state) => state.settings);
export const useThemeSettingActions = () => useThemeSettingStore((state) => state.actions);
