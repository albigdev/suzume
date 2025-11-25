import styled from "styled-components";
import defaultAvatar from "../../public/default-user.jpg";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";

const StyledUserMenu = styled.button`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  cursor: pointer;
  color: var(--color-grey-500);
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-md);
  transition: all 0.2s;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 3px solid var(--color-blue-600);
    outline-offset: 3px;
  }

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const Avatar = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  outline: 2px solid var(--color-grey-100);
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1.4rem;
  line-height: 1.2;

  & > span:first-child {
    font-weight: 600;
    font-size: 1.5rem;
  }

  & > span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

function UserMenu() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata || {};
  const navigate = useNavigate();

  return (
    <StyledUserMenu
      type="button"
      onClick={() => {
        navigate("/profile");
      }}
    >
      <Avatar src={avatar || defaultAvatar} alt={fullName || "User Avatar"} />
      <NameContainer>
        <span>{fullName || "User"}</span>
        <span>Settings</span>
      </NameContainer>
    </StyledUserMenu>
  );
}

export default UserMenu;
