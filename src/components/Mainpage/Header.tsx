import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper className="brandFont">
      <h1>the photo heaven.</h1>
    </Wrapper>
  );
};
export default Header;

const Wrapper = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-position: center;
  backdrop-filter: blur(5px);
  background-image: linear-gradient(
      to right,
      rgba(46, 79, 79, 0.6),
      rgb(14, 131, 136, 0.6)
    ),
    url("./photos/bgMain.jpg");

  h1 {
    font-size: 2.5rem;
    background: -webkit-linear-gradient(
      30deg,
      ${(p) => p.theme.lightColor},
      #414243,
      #fff
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  @media only screen and (min-width: 400px) {
    h1 {
      font-size: 7rem;
    }
  }
`;
