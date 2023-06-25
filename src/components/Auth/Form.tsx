import styled from "styled-components";
import FormRow from "../MainComponents/FormRow";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  authOperation,
  userInfoHandleChange,
} from "../../redux/features/userSlice";

export interface TUserInfos {
  login: string;
}

const Form = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      userInfoHandleChange({
        name: e.currentTarget.name,
        value: e.currentTarget.value,
      })
    );
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(authOperation());
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <FormRow
        name="email"
        labelText="E-mail"
        type="text"
        value={userInfo.email}
        handleChange={handleChange}
      />
      {!userInfo.authLogin && (
        <FormRow
          value={userInfo.username}
          name="username"
          labelText="Username"
          type="text"
          handleChange={handleChange}
        />
      )}
      <FormRow
        value={userInfo.password}
        name="password"
        labelText="Password"
        type="password"
        handleChange={handleChange}
      />
      <button className="btn" type="submit">
        {userInfo.authLogin ? "Login" : "Register"}
      </button>
    </Wrapper>
  );
};
export default Form;
const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
  border-radius: 10px;
  gap: 1rem;
  padding: 1rem;
`;
