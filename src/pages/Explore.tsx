import styled from "styled-components";
import ImageGallery from "../components/Explore/ImageGallery";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUser } from "../redux/features/userSlice";
import { AppDispatch } from "../redux/store";
import { getAllPhotos } from "../redux/features/photoSlice";
import { clearStates } from "../redux/features/userProfileSlice";
  import SubInfo from "../components/Mainpage/SubInfo";
const Explore = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(clearStates());
    dispatch(checkUser());
    dispatch(getAllPhotos());
  }, []);
  return (
    <Wrapper>
      {/* <ExploreNavbar /> */}
      <SubInfo />
      <ImageGallery />
    </Wrapper>
  );
};
export default Explore;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
