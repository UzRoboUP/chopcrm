import { Link } from 'react-router-dom';
import { useBreadcrumbs } from '../context/BreadcrumbContext';
import { MenuItem as BreadcrumbItem } from '../services/menu';
import Heading from './Heading';

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs() as BreadcrumbItem[];

  return (
    <div>
      {breadcrumbs.map((crumb, index) => {
        if (index === breadcrumbs.length - 1) {
          return (
            <Heading key={index} as="h1">
              {crumb.title}
            </Heading>
          );
        }
        return (
          <span key={index}>
            <span> / </span>
            <Link to={crumb.url}>{crumb.title}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
