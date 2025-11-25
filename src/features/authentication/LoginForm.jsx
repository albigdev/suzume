import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@suzume.com");
  const [password, setPassword] = useState("demo123");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setPassword("");
          setEmail("");
        },
      }
    );
  }

  function handleSignup() {
    navigate("/signup");
  }

  function handleForgotPassword() {
    navigate("/forgot-password");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button variation="primary" disabled={isLoading}>
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
        <Button variation="signupBtn" type="button" onClick={handleSignup}>
          Sign up
        </Button>
        <Button
          variation="forgotBtn"
          type="button"
          onClick={handleForgotPassword}
        >
          Forgot your password?
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
