import styled from "styled-components";
import Logo from "./Logo";
import Links from "./Links";
import Auth from "./Auth";

const Navbar = () => {
  return (
    <Wrapper>
      <Logo />
      <Links />
      <Auth />
    </Wrapper>
  );
};
export default Navbar;

const Wrapper = styled.nav`
  background-color: ${(p) => p.theme.darkTurquoiseOpacity};
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;
