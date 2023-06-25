import styled from "styled-components";
import {
  AiOutlinePlus,
} from "react-icons/ai";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getSinglePhoto } from "../../redux/features/photoSlice";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import { getPhotoLikes } from "../../redux/features/likeSlice";
import LikeIconContainer from "./LikeIconContainer";

const PhotoComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<string>();
  const { singlePhoto } = useSelector((state: RootState) => state.photo);

  const addList = () => {
    console.log("addList");
  };
  useEffect(() => {
    if (id) {
      dispatch(getSinglePhoto(id));
      dispatch(getPhotoLikes(id));
    }
  }, [id]);
  return (
    <Wrapper>
      {singlePhoto.isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="imgContainer">
            <img
              src={`${singlePhoto.photoPath}` || "https://placehold.co/800x400"}
              alt=""
            />
          </div>
          <div className="iconContainer">
            <LikeIconContainer />
            <div className="singleIcon" onClick={addList}>
              <AiOutlinePlus />
            </div>
          </div>{" "}
        </>
      )}
    </Wrapper>
  );
};
export default PhotoComponent;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  .imgContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 50vh;
    max-height: fit-content;
    max-width: max-content;
  }
  .iconContainer {
    position: absolute;
    padding: 0.2rem;
    border-radius: 10px;
    bottom: 10px;
    width: 50%;
    display: flex;
    justify-content: center;
    gap: 1rem;
    .singleIcon {
      cursor: pointer;
      display: flex;
      background-color: ${(p) => p.theme.lightTurquoise};
      border-radius: 50%;
      padding: 0.5rem;
      transition: 0.2s;
      &:hover {
        background-color: ${(p) => p.theme.darkTurquoise};
      }
      svg {
        font-size: 1.5rem;
      }
    }
  }

  //m
  @media screen and (min-width: 600px) {
    img {
      width: 100%;
      height: 60vh;
    }
  }
  //dekstop
  @media screen and (min-width: 768px) {
    img {
      width: 100%;
      height: 70vh;
    }
  }
`;
