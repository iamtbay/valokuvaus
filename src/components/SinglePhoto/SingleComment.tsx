import styled from "styled-components";
import {
  IAllComments,
  deleteComment,
  handleCommentEdit,
} from "../../redux/features/commentSlice";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router-dom";

const SingleComment = (props: IAllComments) => {
  const { userSettings } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const { _id, userId, comment, date, rating, userInfo } = props;
  const { username } = userInfo[0];
  const { id: imgId } = useParams();
  const handleEdit = () => {
    dispatch(
      handleCommentEdit({
        commentId: _id,
        comment: comment,
        rating: rating,
      })
    );
  };
  const handleDelete = () => {
    dispatch(deleteComment({ commentId: _id, imgId }));
  };

  return (
    <>
      {
        <Wrapper>
          <div className="commentTitle">
            <p className="underline colorHover cursor">{username || userId}</p>

            {userSettings.userId === userId && (
              <div className="operationContainer">
                <button className="btn yellow" onClick={handleEdit}>
                  Edit
                </button>
                <button className="btn red" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}
          </div>
          <div className="comment">
            <p>{comment}</p>
            <p>{dayjs(date).format("DD.MM.YYYY")}</p>
          </div>
          <div>
            <p>Point: {rating}</p>
          </div>
        </Wrapper>
      }
    </>
  );
};
export default SingleComment;

const Wrapper = styled.div`
  border: 1px solid ${(p) => p.theme.darkestColor};
  width: 100%;
  min-width: 200px;
  border-radius: 10px;
  padding: 0.5rem 0.5rem;
  color: ${(p) => p.theme.lightColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  overflow: hidden;
  @media only screen and (max-width: 768px) {
    .comment {
    }
  }

  .commentTitle {
    display: flex;
    justify-content: space-between;
    width: 100%;
    p {
      background-color: ${(p) => p.theme.lightTurquoiseOpacity};
      border-radius: 10px;
      padding: 0.5rem 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .operationContainer {
      display: flex;
      gap: 0.5rem;
    }
  }
  .comment {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }
`;
