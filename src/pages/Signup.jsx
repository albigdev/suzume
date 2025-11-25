import SignupForm from "../features/authentication/SignUpForm";
import styled from "styled-components";
import Logo from "../ui/Logo";

const SignUpLayout = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

function Signup() {
  return (
    <SignUpLayout>
      <Logo />
      <SignupForm />
    </SignUpLayout>
  );
}

export default Signup;
