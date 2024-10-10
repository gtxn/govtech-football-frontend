import { Log } from "../utils/schema";
import { useEffect, useState } from "react";
import getLogs from "../api/getLogs";
import Header from "../components/Header";
import LogsHeader from "../components/LogsDisplay/LogsHeader";
import LogArea from "../components/LogsDisplay/LogArea";

export default function LogsDisplay({}: {}) {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get logs from server
  useEffect(() => {
    let getLogsFunc = async () => {
      setIsLoading(true);

      let r = await getLogs();
      if (r && r?.data && r?.data?.success) {
        // Sort logs in descending order of date
        let logsSorted = r?.data?.data.sort(
          (a: Log, b: Log) => b.date_created - a.date_created
        );
        setLogs(logsSorted);
      }

      setIsLoading(false);
    };

    getLogsFunc();
  }, []);

  return (
    <div>
      <Header />

      <div className="mx-5 my-5 lg:mx-20 bg-white p-5 rounded-lg shadow-sm">
        <LogsHeader />

        <LogArea isLoading={isLoading} logs={logs} />
      </div>
    </div>
  );
}
