import React, { useRef } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import styled from "styled-components";

interface IFormRowFile {
  name: string;
  labelText?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const FileUploadRow = ({
  name,
  labelText,
  handleChange,
}: IFormRowFile) => {
  return (
    <Wrapper>
      <section className="uploadImg colorHover">
        <label htmlFor={name}>
          {labelText || (
            <i id="uploader">
              <AiOutlineCloudUpload />
            </i>
          )}
        </label>
      </section>
      <input
        type="file"
        id={name}
        name={name}
        onChange={handleChange}
        accept="image/*"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 200px;
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
`;
