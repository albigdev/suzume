import ForgotPassForm from "../features/authentication/ForgotPassForm";
import styled from "styled-components";
import Logo from "../ui/Logo";

const ForgotPassWordLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function ForgotPassword() {
  return (
    <ForgotPassWordLayout>
      <Logo />
      <ForgotPassForm />
    </ForgotPassWordLayout>
  );
}

export default ForgotPassword;
