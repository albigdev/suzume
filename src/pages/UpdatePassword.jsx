import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import styled from "styled-components";
import Logo from "../ui/Logo";

const UpdatePasswordLayout = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2.4rem;
  background-color: var(--color-grey-50);
`;

function UpdatePassword() {
  return (
    <UpdatePasswordLayout>
      <Logo />
      <UpdatePasswordForm />
    </UpdatePasswordLayout>
  );
}

export default UpdatePassword;
