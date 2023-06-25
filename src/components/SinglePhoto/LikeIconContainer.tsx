import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import { likePhoto, noLikePhoto } from "../../redux/features/likeSlice";
import styled from "styled-components";
const LikeIconContainer = () => {
  const { allLikes } = useSelector((state: RootState) => state.likes);
  const { userSettings } = useSelector((state: RootState) => state.user);
  const find = allLikes.find((like) => like.userId === userSettings.userId);
  const { id } = useParams<string>();
  const dispatch = useDispatch<AppDispatch>();
  const handleLike = () => {
    if (!userSettings.loggedIn) {
      return alert("login or register to like :3");
    }
    if (find) {
      return dispatch(noLikePhoto(id as string));
    }
    dispatch(likePhoto(id as string));
  };
  return (
    <Wrapper className="singleIcon" onClick={handleLike}>
      {find ? <AiFillHeart /> : <AiOutlineHeart />}
      <span>{allLikes.length}</span>
    </Wrapper>
  );
};
export default LikeIconContainer;

const Wrapper = styled.div`
  position: relative;
  span {
    border-radius: 50%;
    background-color: ${(p) => p.theme.lightTurquoise};
    width: 25px;
    position: absolute;
    transform: translate(20px, -20px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
