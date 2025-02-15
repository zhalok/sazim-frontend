import { authMe } from "@/api/auth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const LoginLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authMe().then((res) => {
      if (res.valid) {
        navigate("/seller/products");
      }
    });
  }, [navigate]);

  return <Outlet />;
};

export default LoginLayout;
