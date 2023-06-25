import { NavLink } from "react-router-dom";
import styled from "styled-components";
export interface INavLink {
  isActive: boolean;
}

const UserProfileNavbar = () => {
  return (
    <Wrapper className="profileUserNavbar ">
      <NavLink
        className={({ isActive }: INavLink): any => {
          return isActive ? "active colorHover" : "colorHover";
        }}
        to=""
        end
      >
        Photos
      </NavLink>
      <NavLink
        className={({ isActive }: INavLink): any => {
          return isActive ? "active colorHover" : "colorHover";
        }}
        to="likes"
      >
        Likes
      </NavLink>
      <NavLink
        className={({ isActive }: INavLink): any => {
          return isActive ? "active colorHover" : "colorHover";
        }}
        to="comments"
      >
        Comments
      </NavLink>
    </Wrapper>
  );
};
export default UserProfileNavbar;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  gap: 1rem;
  background-color: ${(p) => p.theme.darkTurquoise};
  border-radius: 10px;
  padding: 0.5rem;
`;
