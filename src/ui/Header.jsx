import Logout from "../features/authentication/Logout";
import styled from "styled-components";
import UserMenu from "./UserMenu";
import DarkModeSwitch from "./DarkModeSwitch";

const StyledHeader = styled.header`
  padding: 1.2rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  background-color: var(--color-white);
  background-color: var(--color-grey-0);

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.6rem;
`;

function Header() {
  return (
    <StyledHeader>
      <UserMenu />

      <DarkModeSwitch />
      <Logout />
    </StyledHeader>
  );
}

export default Header;
