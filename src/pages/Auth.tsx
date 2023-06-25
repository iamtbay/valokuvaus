import {  useEffect } from "react";
import styled from "styled-components";
import Form from "../components/Auth/Form";
import LoginOrMember from "../components/Auth/LoginOrMember";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { changeMethod } from "../redux/features/userSlice";
changeMethod;
const Auth = () => {
  const dispatch = useDispatch();
  const { userSettings } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const changerMethod = () => {
    dispatch(changeMethod());
  };
  useEffect(() => {
    if (userSettings.loggedIn) {
      navigate("/");
    }
  }, [userSettings.loggedIn]);
  return (
    <Wrapper>
      <div className="container">
        <Form />
        <LoginOrMember changeMethod={changerMethod} />
      </div>
    </Wrapper>
  );
};
export default Auth;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 300px;
    border-radius: 10px;
    background-color: ${(p) => p.theme.darkTurquoiseOpacity};
    padding: 1rem;
  }
  @media only screen and (min-width: 400px) {
  }
  .container {
    width: 75%;
  }
  @media only screen and (min-width: 768px) {
    .container {
      width: 40%;
    }
  }
`;
