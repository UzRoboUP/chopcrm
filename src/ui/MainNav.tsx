import {
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineUsers,
} from "react-icons/hi2";
import { IconType } from "react-icons/lib";
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
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
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

const iconMap: Record<string, IconType> = {
  'HiOutlineHome': HiOutlineHome,
  'HiOutlineUsers': HiOutlineUsers,
  'HiOutlineCog6Tooth': HiOutlineCog6Tooth,
};


function MainNav() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const filteredMenu = getMenuData.filter(item => {

    return item.roles.some(role => user?.roles?.includes(role));
  });

  return (
    <nav>
      <NavList>
        {filteredMenu.map(item => {
          const Icon = iconMap[item.icon] || HiOutlineHome;
          return (
            <li key={item.key}>
              <StyledNavLink to={item.url}>
                <Icon />
                <span>{item.title}</span>
              </StyledNavLink>
            </li>
          );
        })}
      </NavList>
    </nav>
  );
}

export default MainNav;
