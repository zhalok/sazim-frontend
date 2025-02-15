import { authMe } from "@/api/auth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const SellerLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authMe().then((res) => {
      if (!res.valid) {
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default SellerLayout;
