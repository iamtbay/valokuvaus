import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppDispatch, RootState } from "../../redux/store";
import {
  addNewComment,
  clearCurrentCommentInfo,
  handleChange,
  patchComment,
  showCommentComponent,
} from "../../redux/features/commentSlice";
import FormRow from "../MainComponents/FormRow";
import { useParams } from "react-router-dom";

const AddComment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { newCommentInfo } = useSelector((state: RootState) => state.comment);
  const { id } = useParams();
  const changeIt = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      handleChange({ name: e.currentTarget.name, value: e.currentTarget.value })
    );
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newCommentInfo.editComment) {
      return dispatch(patchComment({ imageId: id as string }));
    } else if (!newCommentInfo.editComment) {
      return dispatch(addNewComment(id as string));
    }
  };
  const handleCommentOperation = () => {
    dispatch(showCommentComponent());
    if (newCommentInfo.editComment) {
      dispatch(clearCurrentCommentInfo());
    }
  };

  return (
    <Wrapper className="component">
      <div>
        <button className="btn" onClick={handleCommentOperation}>
          {!newCommentInfo.showComment
            ? newCommentInfo.editComment
              ? "Edit Comment"
              : "Add Comment"
            : "Close comment"}
        </button>
      </div>
      {newCommentInfo.showComment && (
        <form onSubmit={handleSubmit}>
          <FormRow
            name="comment"
            placeholder="Type your comment here"
            value={newCommentInfo.comment}
            handleChange={changeIt}
            type="textarea"
            labelText="Type your comment here"
          />
          <FormRow
            type="number"
            name="rating"
            labelText="Rating"
            handleChange={changeIt}
            value={newCommentInfo.rating || 0}
          />

          <button className="btn" type="submit">
            {newCommentInfo.editComment ? "Edit Comment" : "Send comment"}
          </button>
        </form>
      )}
    </Wrapper>
  );
};
export default AddComment;

const Wrapper = styled.div`
  border: 1px solid ${(p) => p.theme.darkestColor};
  background-color: ${(p) => p.theme.darkTurquoiseOpacity};
  width: 100%;
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  @media only screen and (min-width: 768px) {
    width: 60%;
  }
`;
