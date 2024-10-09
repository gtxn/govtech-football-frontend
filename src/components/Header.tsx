import React from "react";
import { signOut } from "aws-amplify/auth";

import CommonButton from "./CommonButton";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, IconButton, Typography } from "@mui/material";
import { Home } from "@mui/icons-material";

export default function Header({}) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex px-5 py-10 lg:px-20 bg-gray-200 justify-between items-center mb-10 z-10 h-100 border-b-2 border-gray-300">
      {location.pathname === "/" ? (
        <div></div>
      ) : (
        <CommonButton
          title="< Home"
          onClick={() => {
            navigate("/");
          }}
          variant="text"
          style={{
            fontSize: "18px",
            fontWeight: "500",
            textDecoration: "underline",
            textTransform: "none",
          }}
        />
      )}

      <Typography variant="h5">Govtech Football Tournament</Typography>

      <div className="flex flex-col gap-2">
        <CommonButton
          title={"View logs"}
          variant="outlined"
          color="info"
          onClick={() => {
            navigate("/logs");
          }}
          style={{
            width: "100%",
          }}
        />
        <CommonButton
          title={"Logout"}
          variant="outlined"
          color="gray"
          onClick={async () => {
            await signOut();
            await navigate("/");
          }}
          style={{
            width: "100%",
          }}
        />
      </div>
    </div>
  );
}
