import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Page404 = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);

  return <></>;
};
