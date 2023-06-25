import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../redux/store";

interface ILoginOrMember {
  changeMethod: () => void;
}
const LoginOrMember = ({ changeMethod }: ILoginOrMember) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  return (
    <Wrapper>
      <p>
        {userInfo.authLogin ? "Not register yet ?" : "Already a member?"}{" "}
        <a className="clickable colorHover underline" onClick={changeMethod}>
          {userInfo.authLogin ? "Register" : "Login"}
        </a>
      </p>
    </Wrapper>
  );
};
export default LoginOrMember;

const Wrapper = styled.div`
  p {
    font-size: 0.9rem;
  }
  a {
    cursor: pointer;
  }
`;
