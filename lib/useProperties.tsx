'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from 'react';
import { Property } from './types';
import { propertyService } from './propertyService';

interface PropertiesContextType {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refetch: (force?: boolean) => Promise<void>;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export const PropertiesProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);
  const isFetchingRef = useRef(false);

  const fetchProperties = useCallback(async (force = false) => {
    if (isFetchingRef.current) return Promise.resolve();
    if (hasFetchedRef.current && !force) return Promise.resolve();

    try {
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);
      const data = await propertyService.getAll({ force });
      setProperties(data);
      hasFetchedRef.current = true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch properties');
      console.error('Error fetching properties:', err);
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        loading,
        error,
        refetch: (force?: boolean) => fetchProperties(force),
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertiesProvider');
  }
  return context;
};
