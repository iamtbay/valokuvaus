import styled from "styled-components";

interface IUserAbout {
  userAbout: string;
}
const AboutMe = ({ userAbout }: IUserAbout) => {
  return (
    <Wrapper>
      <h3>About me.</h3>
      <p>{userAbout}</p>
    </Wrapper>
  );
};
export default AboutMe;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
