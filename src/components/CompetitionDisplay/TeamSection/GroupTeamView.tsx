import { useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import TeamTable from "./TeamTable";

export default function GroupTeamView({
  teamData,
  groupNumber,
  colorTheme,
}: {
  teamData: any;
  groupNumber: string | number;
  colorTheme: "blue" | "green";
}) {
  const backgroundColor = colorTheme === "blue" ? "bg-blue-50" : "bg-green-50";
  const textColor = colorTheme === "blue" ? "text-blue-900" : "text-green-900";
  const highlightColor = colorTheme === "blue" ? "#c6e7f1" : "#c6f1c6";

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="md:w-1/2">
      <div
        className={`md:mr-2 relative ${backgroundColor} rounded-xl p-5 box-border z-0`}
      >
        <div
          className="w-100 cursor-pointer flex justify-between items-center"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          <h4 className={`text-lg font-semibold ${textColor}`}>
            Group {groupNumber}
          </h4>

          <ArrowDownwardIcon
            sx={{
              transform: `rotate(${isExpanded ? 180 : 0}deg)`,
              color: "#333333",
            }}
          />
        </div>

        {isExpanded && (
          <TeamTable
            teams={teamData}
            highlightColor={highlightColor}
            accentTop3={true}
          />
        )}
      </div>
    </div>
  );
}
