import { NavConfig } from '~~/types/navigation';

const navConfig = { pageTitle: 'midiGuru' } as NavConfig;

export const useNavState = () =>
  useState<NavConfig>('navState', () => navConfig);
