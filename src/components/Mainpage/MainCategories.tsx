import { useState } from "react";
import styled from "styled-components";
import PreCategory from "./PreCategory";
export interface IPreCategories {
  id: string;
  name: string;
  link: string;
  img: string;
}

const MainCategories = () => {
  const [preCategories, setPreCategories] = useState<IPreCategories[]>([
    {
      id: "1",
      name: "Top",
      link: "b",
      img: "https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1400&q=60",
    },
    {
      id: "2",
      name: "Hot",
      link: "b",
      img: "https://images.unsplash.com/photo-1679398380337-d953e0f65e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1400&q=60",
    },
    {
      id: "3",
      name: "New",
      link: "b",
      img: "https://images.unsplash.com/photo-1679390248298-3b2331fed904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1400&q=60",
    },
    {
      id: "4",
      name: "Explore",
      link: "b",
      img: "https://images.unsplash.com/photo-1679076671078-d58d9cbcaef7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=60",
    },
  ]);
  return (
    <Wrapper>
      {preCategories.map((singleCategory) => {
        return <PreCategory key={singleCategory.id} {...singleCategory} />;
      })}
    </Wrapper>
  );
};
export default MainCategories;

const Wrapper = styled.section`
  display: flex;
  padding: 0.5rem 0;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  .preCategories {
    h1 {
      position: absolute;
    }
    &:nth-child(even) {
      h1 {
        right: 10px;
        bottom: 5px;
      }
    }
    &:nth-child(odd) {
      h1 {
        left: 10px;
        top: 5px;
      }
    }
  }

  @media only screen and (max-width: 419px) {
    flex-direction: column;
  }
  @media only screen and (min-width: 420px) {
  }
`;
