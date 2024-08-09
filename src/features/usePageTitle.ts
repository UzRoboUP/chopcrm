import { getMenuData } from '../services/menu';
import { PageNameType } from '../services/tracks/TrackContentCard';

export function usePageTitle(pagename: PageNameType) {
  return getMenuData.find((menu) => menu.key === pagename)?.title;
}
