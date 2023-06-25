import styled from "styled-components";

interface IContactMe {
  contactInfo: {
    email: string;
    linkedIn: string;
  };
}
const ContactMe = ({ contactInfo }: IContactMe) => {
  return (
    <Wrapper>
      <h3>Contact</h3>
      <div className="contacts">
        <section>
          <p>{contactInfo.email}</p>
        </section>
        <section>
          <p>{contactInfo.linkedIn}</p>
        </section>
      </div>
    </Wrapper>
  );
};
export default ContactMe;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
