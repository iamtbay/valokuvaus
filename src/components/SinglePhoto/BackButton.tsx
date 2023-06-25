import { useNavigate } from "react-router-dom";
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="btnContainer">
      <button onClick={() => navigate("/explore")} className="btn">
        Go back
      </button>
    </div>
  );
};
export default BackButton;
