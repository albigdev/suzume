import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  //2. If no user, redirect to login page
  // return <Navigate to="/login" replace />;
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate]
  );

  //3. While loading, show a loading indicator
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. If user, show the protected page

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
