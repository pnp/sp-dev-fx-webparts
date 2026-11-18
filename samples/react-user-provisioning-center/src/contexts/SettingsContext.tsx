import * as React from 'react';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { QK_SETTINGS } from '../constants/queryKeys';
import { DEFAULT_APP_SETTINGS, type IAppSettings } from '../models';
import { useServices } from './ServicesContext';

export type { IAppSettings };

const SettingsContext: React.Context<IAppSettings> =
  React.createContext<IAppSettings>(DEFAULT_APP_SETTINGS);

export function useAppSettingsQuery(): UseQueryResult<Partial<IAppSettings>> {
  const services = useServices();
  return useQuery(QK_SETTINGS, () => services.data.getAppSettings(), {
    staleTime: 5 * 60 * 1000,

    retry: false
  });
}

export const SettingsProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const services = useServices();
  const query = useAppSettingsQuery();
  const value: IAppSettings = React.useMemo(
    () => ({ ...DEFAULT_APP_SETTINGS, ...(query.data ?? {}) }),
    [query.data]
  );

  React.useEffect(() => {
    services.engine.updateSettings(value);
  }, [services.engine, value]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export function useSettings(): IAppSettings {
  return React.useContext(SettingsContext);
}
