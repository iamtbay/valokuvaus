import { useEffect, useState } from "react";
import { baseUrl } from "../../../axios/axios";
import Loading from "../../Loading";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
interface IUserSingleImg {
  imageId: string;
}

const UserLikeSingleImg = ({ imageId }: IUserSingleImg) => {
  const [url, setUrl] = useState<string>();
  const [imgLoading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const getImg = async () => {
    try {
      const likeImg = await baseUrl.get(`/api/v1/explore/photo/${imageId}`);
      const res = await likeImg.data.data;
      setUrl(res.photoPath);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    navigate(`/photo/${imageId}`);
  };

  useEffect(() => {
    getImg();
  }, []);
  return imgLoading ? (
    <Loading />
  ) : (
    <Wrapper src={`${url}`} alt="" onClick={handleClick} />
  );
};
export default UserLikeSingleImg;
const Wrapper = styled.img`
  border: 1px solid #fff;
  border-radius: 10px;
  overflow: hidden;
`;
