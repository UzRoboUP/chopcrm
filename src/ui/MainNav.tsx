import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import { getMenuData } from "../services/menu";

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
    background: #21529C;
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
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const filteredMenu = getMenuData.filter(item => {
    return item.roles.some(role => user?.roles?.includes(role));
  });

  return (
    <nav className="sidebar__nav">
      <NavList>
        {filteredMenu.map(({ key, path, icon, title, iconActive }) => {
          return (
            <li key={key}>
              <StyledNavLink to={path}>
                {({ isActive }) => (
                  <>
                    <img
                      src={
                        isActive
                          ? iconActive
                          : icon
                      }
                      alt="Icon"
                    />
                    <span>{title}</span>
                  </>
                )}
              </StyledNavLink>
            </li>
          );
        })}
      </NavList>
      <div className="sidebar__bottom">
        <NavList>
          <li>
            <StyledNavLink to='support' className='sidebar__support'>
              <p>❤️ Поддержка <span>24/7</span></p>
            </StyledNavLink>
          </li>
        </NavList>
        <NavList>
          <li>
            <StyledNavLink to='/login' className='sidebar__logout'>
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
