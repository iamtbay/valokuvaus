import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../redux/store";
import { clearImgState } from "../../redux/features/photoSlice";

const FormImgContainer = () => {
  const { photoPath } = useSelector((state: RootState) => state.photo);
  const dispatch = useDispatch();
  const clearImgStateComponent = () => {
    dispatch(clearImgState());
  };
  return (
    <Wrapper>
      <img src={URL.createObjectURL(photoPath as Blob)} />
      <button className="btn red" onClick={clearImgStateComponent}>
        Clear Photo
      </button>
    </Wrapper>
  );
};
export default FormImgContainer;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  img {
    height: 25vh;
    border-radius: 10px;
  }
  .btn {
    width: 50%;
  }
`;
