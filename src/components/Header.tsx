import React from "react";
import { signOut } from "aws-amplify/auth";

import CommonButton from "./CommonButton";
import { useNavigate } from "react-router-dom";

export default function Header({}) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center mt-3 mb-10 z-10 h-100">
      <CommonButton
        title="back to start page"
        onClick={() => {
          navigate("/");
        }}
        variant="outlined"
      />

      <CommonButton
        title={"Logout"}
        variant="outlined"
        color="gray"
        onClick={async () => {
          await signOut();
          await navigate("/");
        }}
        style={
          {
            // position: "absolute",
          }
        }
      />
    </div>
  );
}
