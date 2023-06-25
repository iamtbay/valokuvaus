import { useEffect } from "react";
import styled from "styled-components";
import SingleComment from "./SingleComment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllComments } from "../../redux/features/commentSlice";
import { useParams } from "react-router-dom";
import Loading from "../Loading";

const AllComments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { allComments, isLoading } = useSelector(
    (state: RootState) => state.comment
  );
  useEffect(() => {
    dispatch(getAllComments(id as string));
  }, []);

  return (
    <Wrapper>
      {!isLoading ? (
        allComments ? (
          <>
            <p>{allComments.length} comments </p>
            {allComments.map((comment) => {
              return <SingleComment key={comment._id} {...comment} />;
            })}
          </>
        ) : (
          <h4>Nobody comment for this photo </h4>
        )
      ) : (
        <Loading />
      )}
    </Wrapper>
  );
};
export default AllComments;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  @media only screen and (min-width: 768px) {
    max-width: 60%;
  }
`;
