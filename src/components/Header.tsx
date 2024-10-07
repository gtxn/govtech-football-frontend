import React from "react";
import { signOut } from "aws-amplify/auth";

import CommonButton from "./CommonButton";
import { useNavigate } from "react-router-dom";

export default function Header({}) {
  const navigate = useNavigate();
  return (
    <div className="w-100 flex justify-end mt-3 z-10 h-100">
      <CommonButton
        title={"Logout"}
        onClick={async () => {
          await signOut();
          await navigate("/");
        }}
        variant="contained"
        style={
          {
            // position: "absolute",
          }
        }
      />
    </div>
  );
}
