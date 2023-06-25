import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const ExploreNavbar = () => {
  const [subCategories, setSubCategories] = useState([
    {
      id: "1",
      name: "All",
      link: "/explore",
    },
    {
      id: "2",
      name: "Nature",
      link: "/category/nature",
    },
    {
      id: "3",
      name: "City",
      link: "/category/city",
    },
    {
      id: "4",
      name: "Animal",
      link: "/category/city",
    },
  ]);
  return (
    <Wrapper>
      {subCategories.map((categories) => {
        return (
          <div key={categories.id}>
            <Link className="colorHover" to={categories.link}>
              {categories.name}
            </Link>
          </div>
        );
      })}
    </Wrapper>
  );
};
export default ExploreNavbar;

const Wrapper = styled.div`
  padding: 0.5rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  border-radius: 10px;
  background-color: ${(p) => p.theme.darkTurquoiseOpacity};
  position: sticky;
`;
