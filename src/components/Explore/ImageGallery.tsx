import styled from "styled-components";
import SingleImage from "./Image";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Loading from "../Loading";

const ImageGallery = () => {
  const { allPhotos, isLoading } = useSelector(
    (state: RootState) => state.photo
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : allPhotos.length < 1 ? (
        <h3>Oh! No images uploaded yet :(</h3>
      ) : (
        allPhotos.map((image) => {
          return <SingleImage {...image} key={image._id} />;
        })
      )}
    </Wrapper>
  );
};
export default ImageGallery;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  .col {
    transition: 1s;
    position: relative;
    &:hover {
    }
  }
  @media only screen and (min-width: 768px) {
    .col {
      flex: 30%;
    }
  }
`;
