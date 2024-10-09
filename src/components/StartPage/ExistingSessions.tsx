import { useEffect, useState } from "react";
import getAllSessionsInfo from "../../api/getAllSessionsInfo";
import SessionCard from "./SessionCard";
import { CircularProgress } from "@mui/material";

export default function ExistingSessions({}) {
  let [sessions, setSessions] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  let fetchSessions = async () => {
    setIsLoading(true);

    let r = await getAllSessionsInfo();

    if (r && r?.data && r?.data?.success) {
      setSessions(r.data.data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchSessions();
    };
    fetch();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="w-100 h-screen flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          {sessions.map(
            (session: {
              session_id: string;
              created_at: number;
              last_modified_at: number;
            }) => {
              return <SessionCard session={session} />;
            }
          )}
        </>
      )}
    </div>
  );
}
