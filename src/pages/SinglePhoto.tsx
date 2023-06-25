import styled from "styled-components";
import BackButton from "../components/SinglePhoto/BackButton";
import CommentSection from "../components/SinglePhoto/CommentSection";
import InfoSection from "../components/SinglePhoto/InfoSection";
import PhotoComponent from "../components/SinglePhoto/PhotoComponent";

const SinglePhoto = () => {
  return (
    <Wrapper>
      <BackButton />
      <PhotoComponent />
      <div className="subContainer">
        <CommentSection />
        <InfoSection />
      </div>
    </Wrapper>
  );
};
export default SinglePhoto;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .subContainer {
    display: flex;
    width: 100%;
    flex-direction: column;
    @media only screen and (min-width: 600px) {
      flex-direction: row;
    }
    justify-content: space-between;
    gap: 1rem;
  }
`;
