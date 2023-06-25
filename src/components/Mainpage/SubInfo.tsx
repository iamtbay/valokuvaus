import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../redux/store";
import { NavLink } from "react-router-dom";
import {
  changeMethodRegister,
  changeMethodLogin,
} from "../../redux/features/userSlice";

const SubInfo = () => {
  const { userSettings } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  return (
    <>
      {!userSettings.loggedIn ? (
        <Wrapper>
          <h3>Login or Register for find the inspiration. </h3>
          <div className="loginRegisterContainer">
            <NavLink to="/auth">
              <button
                className="btn"
                onClick={() => {
                  dispatch(changeMethodLogin());
                }}
              >
                Login
              </button>
            </NavLink>
            <NavLink to="/auth">
              <button
                className="btn"
                onClick={() => {
                  dispatch(changeMethodRegister());
                }}
              >
                Register
              </button>
            </NavLink>
          </div>
        </Wrapper>
      ) : (
        <Wrapper>
          <h3>{`Welcome ${userSettings.username}`}</h3>{" "}
        </Wrapper>
      )}
    </>
  );
};
export default SubInfo;

const Wrapper = styled.section`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  background: radial-gradient(
    ${(p) => p.theme.lightTurquoiseOpacity},
    ${(p) => p.theme.darkTurquoiseOpacity}
  );
  h3 {
    font-size: 1.5rem;
  }
  .loginRegisterContainer {
    display: flex;
    justify-content: center;
    width: 50%;
    gap: 1rem;
    .btn {
    }
  }
  @media only screen and (min-width: 400px) {
    .loginRegisterContainer {
      .btn {
        max-width: 200px;
      }
    }
  }
`;
