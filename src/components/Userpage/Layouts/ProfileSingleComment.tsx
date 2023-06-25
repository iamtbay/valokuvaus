import styled from "styled-components";
import { IUserComments } from "../../../redux/features/userProfileSlice";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
//IUSERCOMMENTS IS A INTERFACE FROM USERPROFILEINTERFACE
//WE ARE GETTING VALUES FROM API AND SAVE IT TO THE SLICE WITH TYPES
//SO WE DON'T NEED TO DECLARE VALUES HERE AGAIN.
const ProfileSingleComment = (props: IUserComments) => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <section className="commentContainer">
        <p>
          <span>Rating: </span> {props.rating}
        </p>
        <p>
          <span>Comment: </span>
          {props.comment}
        </p>
        <p>
          <span>Date: </span>
          {dayjs(props.date).format("DD.MM.YY")}
        </p>
      </section>
      <button
        className="btn"
        onClick={() => navigate(`/photo/${props.imageId}`)}
      >
        Go to Photo
      </button>
    </Wrapper>
  );
};
export default ProfileSingleComment;

const Wrapper = styled.div`
  padding: 0.5rem;
  width: 75%;
  border: 1px solid #fff;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  .commentContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
  }
  button {
    width: 15%;
    display: flex;
    justify-content: center;
  }
  span {
    color: ${(p) => p.theme.lightTurquoiseOpacity};
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
