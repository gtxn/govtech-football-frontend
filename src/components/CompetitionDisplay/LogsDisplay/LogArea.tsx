import { CircularProgress } from "@mui/material";
import { Log } from "../../../utils/schema";
import LogEntry from "./LogEntry";

export default function LogArea({
  isLoading,
  logs,
}: {
  isLoading: boolean;
  logs: Array<Log>;
}) {
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="flex flex-col gap-4">
          {logs.map((log: Log) => (
            <LogEntry log={log} />
          ))}
        </div>
      )}
    </>
  );
}
