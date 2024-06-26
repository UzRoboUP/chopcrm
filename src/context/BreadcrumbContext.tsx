import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuItem as BreadcrumbItem, getMenuData } from '../services/menu/index';

type BreadcrumbContextType = BreadcrumbItem[];

export const BreadcrumbContext = createContext<BreadcrumbContextType>([]);

export const BreadcrumbProvider = ({ children }: { children: ReactNode; }) => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbContextType>([]);

  useEffect(() => {
    function getPath(data: BreadcrumbItem[], url: string, parents: BreadcrumbItem[] = []): BreadcrumbItem[] {
      if (url === '/') {
        url = '/analytics';
      }
      return data.reduce((result, entry) => {
        if (result.length) {
          return result;
        }

        if (entry.url === url) {
          return [entry].concat(parents);
        }
        return result;
      }, [] as BreadcrumbItem[]);
    }

    const fullBreadcrumb = getPath(getMenuData, location.pathname);
    setBreadcrumbs(fullBreadcrumb);
  }, [location]);

  return (
    <BreadcrumbContext.Provider value={breadcrumbs}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumbs = (): BreadcrumbContextType => useContext(BreadcrumbContext);
