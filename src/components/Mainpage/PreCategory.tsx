import styled from "styled-components";
import { IPreCategories } from "./MainCategories";

const PreCategory = (props: IPreCategories) => {
  const { name, link, img } = props;

  return (
    <Wrapper className="preCategories letterSpacing">
      <h1 className="">{name}</h1>
    </Wrapper>
  );
};
export default PreCategory;

const Wrapper = styled.div`
  background-color: ${(p) => p.theme.lightTurquoise};
  cursor: pointer;
  border-radius: 10px;
  position: relative;
  transition: 1s;
  border: 1px solid ${(p) => p.theme.lightTurquoise};
  &:hover {
    background-color: ${(p) => p.theme.darkTurquoise};
    border-color: ${(p) => p.theme.lightColor};
  }
  h1 {
    font-family: "Italiana", "serif";
    letter-spacing: 3px;
    font-size: 2rem;
    color: ${(p) => p.theme.lightColor};
  }

  @media only screen and (max-width: 419px) {
    width: 50%;
    height: 20vh;
  }
  @media only screen and (min-width: 420px) and (max-width: 719px) {
    width: 45%;
    height: 20vh;
  }
  @media only screen and (min-width: 720px) and (max-width: 1023px) {
    width: 30%;
    height: 30vh;
    h1 {
      font-size: 2.5rem;
    }
  }
  @media only screen and (min-width: 1024px) {
    width: 20%;
    height: 30vh;
    h1 {
      font-size: 3rem;
    }
  }
`;
