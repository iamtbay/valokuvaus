import { MdLogin, MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppDispatch, RootState } from "../../redux/store";
import { logoutUser } from "../../redux/features/userSlice";
const Auth = () => {
  const { userSettings } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    console.log("logout");
    dispatch(logoutUser());
  };

  return (
    <Wrapper className="linksContainer ">
      {userSettings.loggedIn ? (
        <Link className="colorHover" to="/auth" onClick={handleLogout}>
          Logout
        </Link>
      ) : (
        <Link to="/auth" className="colorHover">
          Login
        </Link>
      )}
    </Wrapper>
  );
};
export default Auth;

const Wrapper = styled.section`
  width: 20%;

  @media only screen and (min-width: 400px) {
    svg {
      font-size: 1.5rem;
    }
  }
`;
