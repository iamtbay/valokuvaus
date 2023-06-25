import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import styled from "styled-components";
import ProfileSingleComment from "./ProfileSingleComment";

const UserComments = () => {
  const { userComments } = useSelector((state: RootState) => state.profile);

  return (
    <Wrapper>
      <h4>{userComments.length} comments found</h4>
      {userComments.map((comment) => {
        return <ProfileSingleComment key={comment._id} {...comment} />;
      })}
    </Wrapper>
  );
};
export default UserComments;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 35vh;
  align-items: center;
  overflow: hidden;
  overflow-y: scroll;
`;
