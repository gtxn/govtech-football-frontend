import { Typography } from "@mui/material";
import { convertUnixToSgTime } from "../utils/date";
import { Log } from "../utils/schema";
import { useEffect, useState } from "react";
import getLogs from "../api/getLogs";
import Header from "../components/Header";

export default function LogsDisplay({}: {}) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let getLogsFunc = async () => {
      let r = await getLogs();
      if (r && r?.data && r?.data?.success) {
        // Sort logs in descending order of date
        let logsSorted = r?.data?.data.sort(
          (a: Log, b: Log) => b.date_created - a.date_created
        );
        setLogs(logsSorted);
      }
    };

    getLogsFunc();
  }, []);

  return (
    <div>
      <Header />

      <div className="mx-5 my-5 lg:mx-20 bg-white p-5 rounded-lg shadow-sm">
        <div className="mb-5">
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            My logs
          </Typography>
          <p className="italic text-gray-700">
            Only displays logs that concern the current user
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {logs.map((log: Log) => (
            <div className="flex justify-between">
              <p className="text-gray-700 font-bold w-1/6">
                {convertUnixToSgTime(log.date_created)}
              </p>
              <p className="w-5/6">{log.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
