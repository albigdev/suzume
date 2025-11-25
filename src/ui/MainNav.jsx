import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaCarAlt } from "react-icons/fa";
import { BsSpeedometer } from "react-icons/bs";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const SyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-blue-900);
    font-size: 1.6rem;
    font-weight: 600;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-blue-700);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-blue-900);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-red-700);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <SyledNavLink to="/dashboard">
          <BsSpeedometer />
          Dashboard
        </SyledNavLink>
        <SyledNavLink to="/drivinghistory">
          <FaCarAlt />
          Driving History
        </SyledNavLink>
      </NavList>
    </nav>
  );
}

export default MainNav;
