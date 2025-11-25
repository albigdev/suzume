import styled from "styled-components";
import useDarkMode from "../features/darkmode/useDarkMode";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 11rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  const logoSrc = isDarkMode ? "/logo-suzume-dark.png" : "/logo-suzume.png";

  return (
    <StyledLogo>
      <Img src={logoSrc} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
