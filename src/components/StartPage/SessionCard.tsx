import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { convertUnixToSgTime } from "../../utils/date";
import { useNavigate } from "react-router-dom";

export default function SessionCard({ session }: { session: any }) {
  const navigate = useNavigate();

  return (
    <div className="mt-4 bg-gray-50 shadow-sm rounded-md p-5 m-2 flex flex-row justify-between items-center">
      <div>
        <p className="text-lg font-semibold">{session.session_id}</p>

        <p className="text-sm text-gray-700">
          <span className="font-medium">Created At:</span>{" "}
          {convertUnixToSgTime(session.created_at)}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Last Modified:</span>{" "}
          {convertUnixToSgTime(session.last_modified_at)}
        </p>
      </div>

      <IconButton
        size="large"
        onClick={() => {
          navigate(`/matches?session_id=${session.session_id}`);
        }}
      >
        <ArrowForwardIcon fontSize="large" color="primary" />
      </IconButton>
    </div>
  );
}
