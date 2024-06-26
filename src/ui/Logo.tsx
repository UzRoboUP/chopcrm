import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";
// import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "/logo-dark.png" : "/img/logo.svg";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" style={{ width: 100 }} />
    </StyledLogo>
  );
}

export default Logo;
