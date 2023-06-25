import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import Loading from "../Loading";

const UserHeader = () => {
  const { username } = useSelector((state: RootState) => state.profile);
  return (
    <Wrapper>
      {username.isLoading ? <Loading /> : <p>{username.username}</p>}
    </Wrapper>
  );
};
export default UserHeader;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #fff;
  border-radius: 10px;
  img {
    border-radius: 50%;
    width: 100px;
    max-width: 250px;
  }
  @media only screen and (min-width: 400px) {
    img {
    }
  }
  @media only screen and (min-width: 767px) {
    justify-content: center;
    img {
    }
  }
`;
