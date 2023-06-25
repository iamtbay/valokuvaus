import styled from "styled-components";
import {
  AiOutlineUser,
  AiOutlineCamera,
  AiOutlineTags,
  AiOutlineMessage,
} from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { MdCalendarToday } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import Loading from "../Loading";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { deleteImage, getAllPhotos } from "../../redux/features/photoSlice";

const InfoSection = () => {
  const { singlePhoto } = useSelector((state: RootState) => state.photo);
  const { userSettings } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const deleteImg = () => {
    dispatch(deleteImage(singlePhoto._id));
    dispatch(getAllPhotos());
    navigate("/explore");
    location.reload();
  };
  return (
    <Wrapper className="component">
      <h3>Details</h3>
      {singlePhoto.isLoading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <div>
            <AiOutlineUser />
            <p
              className="colorHover cursor"
              onClick={() => navigate(`/user/${singlePhoto.userId}`)}
            >
              {singlePhoto.userInfo[0].username}
            </p>
          </div>
          <div>
            <CiLocationOn />
            <p>{singlePhoto.location}</p>
          </div>
          <div>
            <AiOutlineCamera />
            <p>{singlePhoto.device}</p>
          </div>
          <div>
            <MdCalendarToday />
            <p>{dayjs(singlePhoto.createdAt).format("DD.MM.YYYY")}</p>
          </div>
          <div>
            <AiOutlineTags />
            <p>
              {singlePhoto.tags.map((tag, index) => {
                return <span key={index}>{tag}, </span>;
              })}
            </p>
          </div>
          <div className="explanation">
            <AiOutlineMessage />
            <div>
              <p>{singlePhoto.desc}</p>
            </div>
          </div>
          {singlePhoto.userId === userSettings.userId && (
            <div className="deleteBtnContainer">
              <button className="red btn" onClick={deleteImg}>
                Delete Image
              </button>
            </div>
          )}
        </>
      )}
    </Wrapper>
  );
};
export default InfoSection;

const Wrapper = styled.div`
  flex: 30%;
  max-height: 50vh;
  align-items: flex-start !important;
  overflow-y: scroll;
  padding: 1rem;
  div {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    svg {
      font-size: 1.5rem;
    }
  }
  .explanation {
    display: flex !important;
    flex-direction: column !important;
    justify-content: start !important;
    align-items: start !important;
    gap: 0.5rem;
    div {
      padding: 0 1rem;
    }
  }
  .deleteBtnContainer {
    width: 100%;
    padding: 0.5rem 0.5rem;
  }
`;
