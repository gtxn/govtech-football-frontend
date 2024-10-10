import { useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import TeamTable from "./TeamTable";
import Expandable from "../../Expandable";

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
  const highlightColor = colorTheme === "blue" ? "#c6e7f1" : "#c6f1c6";

  return (
    <div className="md:w-1/2">
      <div
        className={`md:mr-2 relative ${backgroundColor} rounded-xl p-5 box-border z-0`}
      >
        <Expandable
          colorTheme={colorTheme}
          header={`Group ${groupNumber}`}
          body={
            <TeamTable
              teams={teamData}
              highlightColor={highlightColor}
              accentTop3={true}
            />
          }
          defaultOpen={true}
        />
      </div>
    </div>
  );
}
