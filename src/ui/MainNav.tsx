/* eslint-disable @typescript-eslint/no-unused-vars */
import { Menu, MenuProps } from 'antd';
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { useClientCompanies } from '../features';
import { logout } from '../features/authentication/authSlice';
import { useUser } from '../features/authentication/useUser';
import { getMenuData } from '../services/menu';
import { useAppDispatch } from '../store/hooks';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  border-radius: 10px;

  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 12px;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */

  &:active,
  &.active:link,
  &.active:visited {
    color: #ffffff;
    background: #21529c;
  }
  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  const { userData } = useUser();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { clientCompanies } = useClientCompanies();

  if (!userData) {
    return null;
  }

  const filteredMenu = getMenuData.filter((item) => {
    return item.roles.some((role) => userData?.staff_status?.includes(role));
  });

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('clicked: ', e);
  };

  const getMenuItems = (icon, iconActive, title) => {
    const items = [
      {
        key: '100',
        label: (
          <StyledNavLink
            to={`stock?company_id=${clientCompanies?.results[0]?.id}`}
          >
            {({ isActive }) => (
              <>
                <img src={isActive ? iconActive : icon} alt="Icon" />
                <span>{title}</span>
              </>
            )}
          </StyledNavLink>
        ),
        children: (clientCompanies?.results || []).map((company) => ({
          key: '105',
          className:
            searchParams.get('company_id') === company.id
              ? 'active-client-company'
              : '',
          label: (
            <p
              key={company.id}
              onClick={() => {
                navigate(`stock?company_id=${company.id}`, {
                  replace: true,
                });
              }}
              className="d-flex align-center justify-center"
            >
              <img
                width="38"
                height="14"
                src={company.image}
                alt={company.image || 'no-image'}
              />
              <span className="sidebar__nav-sub-link">{company.name}</span>
            </p>
          ),
        })),
      },
    ];
    return items;
  };

  return (
    <nav className="sidebar__nav">
      <NavList>
        {filteredMenu.map(({ key, path, icon, title, iconActive }) => {
          if (key === 'stock') {
            return (
              <Menu
                key={key}
                onClick={onClick}
                style={{ padding: '1.2rem 12px !important' }}
                expandIcon={
                  <img
                    src={`/img/sidebar/${path.includes(pathname) ? 'arrow_w' : 'arrow_b'}.svg`}
                    alt="arrow"
                  />
                }
                mode="inline"
                items={getMenuItems(icon, iconActive, title)}
              />
            );
          }
          return (
            <li key={key}>
              <StyledNavLink to={path}>
                {({ isActive }) => (
                  <>
                    <img src={isActive ? iconActive : icon} alt="Icon" />
                    <span>{title}</span>
                  </>
                )}
              </StyledNavLink>
            </li>
          );
        })}
      </NavList>
      <div className="sidebar__bottom mt-20">
        <NavList>
          <li>
            <StyledNavLink to="support" className="sidebar__support">
              <p>
                ❤️ Поддержка <span>24/7</span>
              </p>
            </StyledNavLink>
          </li>
        </NavList>
        <NavList>
          <li>
            <StyledNavLink
              to="/login"
              className="sidebar__logout"
              onClick={() => dispatch(logout())}
            >
              <img src="/img/sidebar/logout.svg" alt="" />
              <span>Выйти</span>
            </StyledNavLink>
          </li>
        </NavList>
      </div>
    </nav>
  );
}

export default MainNav;
