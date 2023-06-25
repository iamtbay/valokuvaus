import { IInitialState, INewPhotoInfos } from "../redux/features/photoSlice";

interface IValues {
  newPhotoInfos: INewPhotoInfos;
  photoPath: string | Blob;
}

export const valChecker = ({ newPhotoInfos, photoPath }: IValues) => {
  let situation = true;
  const a = Object.keys(newPhotoInfos);
  a.map((title) => {
    if (newPhotoInfos[title as keyof INewPhotoInfos] === "") {
      situation = false;
    }
  });
  if (!photoPath) {
    situation = false;
  }
  return situation;
};
