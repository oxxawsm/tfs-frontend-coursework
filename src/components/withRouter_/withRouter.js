import {useNavigate, useParams} from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const params = useParams();

    return <Component {...props} params={params} navigate={navigate}  />;
  };

  return Wrapper;
};
