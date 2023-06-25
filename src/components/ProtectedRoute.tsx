import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}
const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const {
    userSettings: { loggedIn },
  } = useSelector((state: RootState) => state.user);

  //NAVIGATE TO AUTH IF USER IS NOT LOGGED IN.
  useEffect(() => {
    if (!loggedIn) {
      navigate("/auth");
    }
  }, [loggedIn]);
  return <>{children}</>;
};
export default ProtectedRoute;
