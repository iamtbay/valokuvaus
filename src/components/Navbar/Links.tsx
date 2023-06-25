import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../redux/store";
const Links = () => {
  const { userSettings } = useSelector((state: RootState) => state.user);
  return (
    <Wrapper className="linksContainer">
      <NavLink
        to="/explore"
        className={({ isActive }) => {
          return isActive ? "active colorHover" : "colorHover";
        }}
      >
        Explore
      </NavLink>
      <NavLink
        to="/search"
        className={({ isActive }) => {
          return isActive ? "active colorHover" : "colorHover";
        }}
      >
        Search
      </NavLink>
      {userSettings.loggedIn && (
        <NavLink
          to="/addphoto"
          className={({ isActive }) => {
            return isActive ? "active colorHover" : "colorHover";
          }}
        >
          New Photo
        </NavLink>
      )}
    </Wrapper>
  );
};
export default Links;

const Wrapper = styled.section`
  flex-direction: row;
  font-size: 1rem;
  gap: 1rem;

  @media only screen and (min-width: 400px) {
    svg {
      font-size: 1.5rem;
    }
  }
`;
