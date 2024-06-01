import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignInLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/Signin");
  }, []);

  return <div></div>;
};

export default SignInLayout;
