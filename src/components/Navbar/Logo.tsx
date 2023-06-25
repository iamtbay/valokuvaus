import { memo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Logo = () => {
  const navigate = useNavigate();
  return (
    <Wrapper
      className="brandFont linksContainer colorHover"
      onClick={() => navigate("/")}
    >
      <h4>Vkp</h4>
      <p>Valokuvauspaikka</p>
    </Wrapper>
  );
};
export default memo(Logo);
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  cursor: pointer;
  p {
    font-size: 0.7rem;
  }
  @media only screen and (min-width: 400px) {
    h4 {
      font-size: 1.75rem;
    }
    p {
      font-size: 1.5rem;
    }
  }
`;
