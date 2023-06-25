import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <div className="circle"></div>
    </Wrapper>
  );
};
export default Loading;

const rotate = keyframes`
    0%{
        transform: rotate(0deg);
        
    }
    100%{
        transform: rotate(360deg);
    }
    `;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  .circle {
    width: 100px;
    height: 100px;
    border-top: 1px solid #fff;
    border-radius: 50%;
    animation: ${rotate} 2s linear infinite;
  }
`;
