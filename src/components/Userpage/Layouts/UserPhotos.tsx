import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../redux/store";
import { getUserPhotos } from "../../../redux/features/userProfileSlice";
import styled from "styled-components";
import Loading from "../../Loading";

const UserPhotos = () => {
  const { userPhotos } = useSelector((state: RootState) => state.profile);
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/photo/${id}`);
  };
  useEffect(() => {}, []);
  return (
    <Wrapper>
      <div className="imgCollection">
        {!userPhotos ? (
          <h1>User hasn't publish any image </h1>
        ) : userPhotos.isLoading ? (
          <Loading />
        ) : (
          userPhotos.photos.map((photo) => {
            return (
              <div key={photo._id}>
                <img
                  src={`${photo.photoPath}`}
                  onClick={() => handleClick(photo._id)}
                />
              </div>
            );
          })
        )}
      </div>
    </Wrapper>
  );
};
export default UserPhotos;
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
      border-radius: 10px;
      border: 0.5px solid #fff;
      &:hover {
        border-color: ${(p) => p.theme.lightTurquoise};
      }
    }
  }
`;
