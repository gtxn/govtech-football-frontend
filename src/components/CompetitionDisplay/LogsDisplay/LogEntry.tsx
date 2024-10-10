import { convertUnixToSgTime } from "../../../utils/date";
import { Log } from "../../../utils/schema";

export default function LogEntry({ log }: { log: Log }) {
  return (
    <div className="flex justify-between">
      <p className="text-gray-700 font-bold w-1/6">
        {convertUnixToSgTime(log.date_created)}
      </p>
      <p className="w-5/6">{log.message}</p>
    </div>
  );
}
