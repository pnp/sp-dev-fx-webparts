import * as React from 'react';
import type { IServices } from '../services/createServices';

const ServicesContext: React.Context<IServices | undefined> = React.createContext<
  IServices | undefined
>(undefined);

export const ServicesProvider: React.FC<{ services: IServices; children?: React.ReactNode }> = ({
  services,
  children
}) => <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>;

export function useServices(): IServices {
  const services: IServices | undefined = React.useContext(ServicesContext);
  if (!services) {
    throw new Error('useServices must be used inside a ServicesProvider');
  }
  return services;
}
