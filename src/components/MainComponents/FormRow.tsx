import React, { memo, useRef } from "react";
import styled from "styled-components";
interface IFormRow {
  name: string;
  labelText?: string;
  type: string;
  value: string | number;
  placeholder?: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
const FormRow = ({
  name,
  labelText,
  type,
  value,
  handleChange,
  placeholder,
}: IFormRow) => {
  return (
    <Wrapper>
      <label htmlFor={name}>{labelText || name}</label>
      {type !== "textarea" ? (
        <input
          type={type}
          id={name}
          name={name}
          onChange={handleChange}
          value={type === "number" ? Number(value) || 1 : value}
          min={1}
          max={5}
        />
      ) : (
        <textarea
          onChange={handleChange}
          value={value}
          name={name}
          id={name}
          placeholder={placeholder}
          className="normalFont"
          autoFocus
        />
      )}
    </Wrapper>
  );
};
export default memo(FormRow);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
  input[type="file"] {
    display: none;
  }
  .uploadImg {
    display: flex;
    justify-content: center;
    padding: 1rem;
    #uploader {
      background-color: ${(p) => p.theme.lightTurquoiseOpacity};
      font-size: 1.5rem;
      padding: 0.5rem;
      border-radius: 50%;
      border: 1px solid #fff;
      cursor: pointer;
    }
  }
  textarea {
    padding: 0.5rem;
    height: 20vh;
    width: 100%;
    outline: none;
    background: ${(p) => p.theme.darkestColor};
    resize: none;
    color: ${(p) => p.theme.lightColor};
    border-radius: 10px;
  }
`;
