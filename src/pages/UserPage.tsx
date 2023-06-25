import { useEffect, useState } from "react";
import styled from "styled-components";
import AboutMe from "../components/Userpage/AboutMe";
import ContactMe from "../components/Userpage/ContactMe";
import UserHeader from "../components/Userpage/UserHeader";
import {  Outlet, useParams } from "react-router-dom";
import UserProfileNavbar from "../components/Userpage/UserProfileNavbar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  clearStates,
  getUserComments,
  getUserLikes,
  getUserName,
  getUserPhotos,
} from "../redux/features/userProfileSlice";

const UserPage = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  useEffect(() => {
    dispatch(clearStates());
    dispatch(getUserLikes(id as string));
    dispatch(getUserName (id as string));
    dispatch(getUserPhotos(id as string));
    dispatch(getUserComments(id as string));
  }, []);
  return (
    <Wrapper>
      <UserHeader />
      <UserProfileNavbar />
      <section className="outletWrapper">
        <Outlet />
      </section>
      {/* <UserImgCollection
        photos={userInfos.photos}
        username={userInfos.username}
      /> */}
      {/* <AboutMe userAbout={userInfos.userAbout} />
      <ContactMe contactInfo={userInfos.contactInfo} /> */}
    </Wrapper>
  );
};
export default UserPage;
const Wrapper = styled.div`
  background-color: ${(p) => p.theme.darkTurquoiseOpacity};
  border-radius: 10px;
  padding: 1rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .outletWrapper {
    border: 1px solid ${(p) => p.theme.lightTurquoiseOpacity};
    border-radius: 10px;
    padding: 0.5rem;
  }

  @media only screen and (min-width: 400px) {
    width: 80%;
  }
  @media only screen and (min-width: 767px) {
  }
`;
