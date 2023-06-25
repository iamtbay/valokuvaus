import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import styled from "styled-components";
import FormRow from "../components/MainComponents/FormRow";
import {
  addNewPhoto,
  clearPhotoPath,
  clearState,
  handleChange,
  handlePhotoPath,
} from "../redux/features/photoSlice";
import { FileUploadRow } from "../components/Auth/FileUploadRow";
import { baseUrl } from "../axios/axios";
import FormImgContainer from "../components/AddPhoto/FormImgContainer";
import React from "react";
import { valChecker } from "../utils/CheckPhotoFormFn";

const AddPhoto = () => {
  const { newPhotoInfos, photoPath } = useSelector(
    (state: RootState) => state.photo
  );
  const dispatch = useDispatch<AppDispatch>();

  //FUNCTIONS START
  //1
  const handleChanger = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      handleChange({ name: e.currentTarget.name, value: e.currentTarget.value })
    );
  };
  //2

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    //check fnc
    const mychecker = await valChecker({ newPhotoInfos, photoPath });
    if (!mychecker) {
      return alert("fill the all lines.");
    }
    //upload image to server
    const formData = new FormData();
    formData.append("image", photoPath);
    dispatch(clearPhotoPath);
    //post image to server
    const imgGl = await baseUrl.post(
      "/api/v1/explore/photo/uploadPhoto",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    //get uploaded img src to save to photo infos
    const {
      image: { src },
    } = imgGl.data;
    dispatch(addNewPhoto(src));
  };
  //change the file src
  const fileChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const getFile = e.target.files?.[0];
    dispatch(handlePhotoPath(getFile));
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {photoPath && <FormImgContainer />}
        {!photoPath && (
          <FileUploadRow name="image" handleChange={fileChanger} />
        )}
        <FormRow
          name="title"
          labelText="Photo Title"
          type="text"
          value={newPhotoInfos.title}
          handleChange={handleChanger}
        />
        <FormRow
          name="location"
          labelText="Location"
          type="text"
          value={newPhotoInfos.location}
          handleChange={handleChanger}
        />

        <FormRow
          name="desc"
          labelText="Photo Description"
          type="text"
          value={newPhotoInfos.desc}
          handleChange={handleChanger}
        />
        <FormRow
          name="category"
          labelText="Select Category"
          type="text"
          value={newPhotoInfos.category}
          handleChange={handleChanger}
        />
        <FormRow
          name="device"
          labelText="Device"
          type="text"
          value={newPhotoInfos.device}
          handleChange={handleChanger}
        />
        <FormRow
          name="tags"
          labelText="Tags"
          type="text"
          value={newPhotoInfos.tags}
          handleChange={handleChanger}
        />
        <div className="flexContainer flexGap">
          <button className="btn" type="submit">
            Add Photo
          </button>
          <button
            className="btn red"
            type="reset"
            onClick={() => dispatch(clearState())}
          >
            Clear
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddPhoto;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 300px;
  form {
    padding: 1rem;
    border-radius: 10px;
    background-color: ${(p) => p.theme.darkTurquoiseOpacity};
    width: 50%;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
