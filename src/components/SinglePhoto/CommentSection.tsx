import styled from "styled-components";
import AddComment from "./AddComment";
import AllComments from "./AllComments";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  clearCurrentCommentInfo,
  closeCommentComponent,
} from "../../redux/features/commentSlice";

const CommentSection = () => {
  const { userSettings } = useSelector((state: RootState) => state.user);
  const { allComments, commentExist, newCommentInfo } = useSelector(
    (state: RootState) => state.comment
  );
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const checker = async () => {
    if (allComments && allComments.length > 0) {
      const finder = allComments.find(
        (index) => index.userId === userSettings.userId
      );
      if (finder?.userId === userSettings.userId) {
        return setShow(true);
      }
      return setShow(false);
    }
  };

  useEffect(() => {
    checker();
  }, [allComments, show]);
  useEffect(() => {
    dispatch(closeCommentComponent());
    dispatch(clearCurrentCommentInfo());
  }, []);

  return (
    <Wrapper className="component">

      {(userSettings.loggedIn && !commentExist) ||
      (userSettings.loggedIn && !show) ||
      newCommentInfo.editComment ? (
        <AddComment />
      ) : null}

      <AllComments />
    </Wrapper>
  );
};
export default CommentSection;

const Wrapper = styled.div`
  flex: 60%;
  max-height: 50vh;
  gap: 1rem;
  align-items: center;
  overflow-y: scroll;
  width: 100%;
`;
