import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { IPhotoState } from "../../redux/features/photoSlice";
import dayjs from "dayjs";

const SingleImage = (props: IPhotoState) => {
  const { photoPath, _id, userId, createdAt, updatedAt, userInfo } = props;

  const navigate = useNavigate();
  const date = new Date(createdAt).toString();

  return (
    <Wrapper className="col">
      <Img src={photoPath} onClick={() => navigate(`/photo/${_id}`)} />
      <div className="back-card">
        <p>{userInfo[0].username}</p>
        <p>{dayjs(date).format("DD.MM.YYYY")}</p>
      </div>
    </Wrapper>
  );
};
export default SingleImage;
const animation = keyframes`
    0%{
        opacity: 0;
        transform: translateY(50%);
    }
    100%{
        opacity: 100%;
        transform: translateY(-50%);
    }
`;

const Wrapper = styled.div`
  transition: 0.5s;
  max-width: 500px;
  max-height: 300px;
  overflow: hidden;
  border-radius: 10px;
  &:hover {
    transform: scale(1.02);
    .back-card {
      display: flex;
      justify-content: space-between;
    }
  }
  .back-card {
    display: none;
    background-color: ${(p) => p.theme.darkTurquoiseOpacity};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem 1rem;
    transform: translateY(-50%);
    animation: ${animation} 0.5s ease-in-out;
  }
`;
const Img = styled.img`
  width: 100%;
  cursor: pointer;
  width: 500px;
  height: 300px;
  object-fit: cover;
  object-position: center;
`;
