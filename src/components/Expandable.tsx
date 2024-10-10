import { useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function Expandable({
  header: header,
  body,
  colorTheme,
  defaultOpen,
}: {
  header: any;
  body: any;
  colorTheme: "blue" | "green";
  defaultOpen?: boolean;
}) {
  const backgroundColor = colorTheme === "blue" ? "bg-blue-50" : "bg-green-50";
  const textColor = colorTheme === "blue" ? "text-blue-900" : "text-green-900";
  const highlightColor = colorTheme === "blue" ? "#c6e7f1" : "#c6f1c6";

  const [isExpanded, setIsExpanded] = useState(defaultOpen);
  return (
    <>
      <div
        className="w-100 cursor-pointer "
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <div className="flex justify-between items-center">
          <h4 className={`text-lg font-semibold ${textColor}`}>{header}</h4>

          <ArrowDownwardIcon
            sx={{
              transform: `rotate(${isExpanded ? 180 : 0}deg)`,
              color: "#333333",
            }}
          />
        </div>
      </div>

      {isExpanded && body}
    </>
  );
}
