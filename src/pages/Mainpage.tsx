import styled from "styled-components";
import Header from "../components/Mainpage/Header";
import MainCategories from "../components/Mainpage/MainCategories";
import SubInfo from "../components/Mainpage/SubInfo";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Mainpage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/explore");
  }, []);
  return (
    <Wrapper>
      <SubInfo />
      <Header />
      <MainCategories />
    </Wrapper>
  );
};
export default Mainpage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
