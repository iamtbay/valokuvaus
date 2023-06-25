import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getUserLikes } from "../../../redux/features/userProfileSlice";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../axios/axios";
import UserLikeSingleImg from "./UserLikeSingleImg";
import styled from "styled-components";

const UserLikes = () => {
  const { userLikes } = useSelector((state: RootState) => state.profile);
  return (
    <Wrapper>
      <div className="imgCollection">
        {!userLikes ? (
          <h1>User hasn't like any image</h1>
        ) : (
          userLikes.map((like) => {
            return (
              <div key={like.imageId}>
                <UserLikeSingleImg key={like.imageId} imageId={like.imageId} />
              </div>
            );
          })
        )}
      </div>
    </Wrapper>
  );
};
export default UserLikes;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  .imgCollection {
    display: flex;
    gap: 1rem;
    overflow-y: scroll;
    img {
      cursor: pointer;
      transition: 0.5s;
      width: 300px;
      height: 30vh;
      object-fit: cover;
      object-position: center;
      border: 0.5px solid #fff;
      &:hover {
        border-color: ${(p) => p.theme.lightTurquoise};
      }
    }
  }
`;
