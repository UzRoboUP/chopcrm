import { getMenuData } from '../services/menu';
import { PageNameType } from '../ui/ContentCard';

export function usePageTitle(pagename: PageNameType) {
  return getMenuData.find((menu) => menu.key === pagename)?.title;
}
