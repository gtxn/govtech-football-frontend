import { useState } from "react";
import { Team } from "../../../utils/schema";
import CommonButton from "../../CommonButton";
import TeamTable from "./TeamTable";
import { ClearTeamsButton, EditTeamsButton } from "../Buttons";
import SessionSetup from "../../StartPage/SessionSetupPage";
import ButtonBar from "./ButtonBar";
import GroupTeamView from "./GroupTeamView";

export default function TeamView({
  teamsGrp1ForTable,
  teamsGrp2ForTable,
  refetch,
}: {
  teamsGrp1ForTable: Array<Team>;
  teamsGrp2ForTable: Array<Team>;
  refetch?: any;
}) {
  return (
    <div className="relative bg-white rounded-md p-4 shadow-sm">
      {/* Display teams */}
      {teamsGrp1ForTable.length > 0 && teamsGrp2ForTable.length > 0 ? (
        <>
          {/* Button Bar */}
          <ButtonBar
            teamsGrp1ForTable={teamsGrp1ForTable}
            teamsGrp2ForTable={teamsGrp2ForTable}
            refetch={refetch}
          />

          {/* View teams by group */}
          <div className="relative flex flex-col md:flex-row gap-4 md:gap-0 ">
            <GroupTeamView
              groupNumber="1"
              teamData={teamsGrp1ForTable}
              colorTheme="green"
            />

            <GroupTeamView
              groupNumber="2"
              teamData={teamsGrp2ForTable}
              colorTheme="blue"
            />
          </div>
        </>
      ) : (
        // If team data has been completely cleared
        <>
          <p className="text-gray-500 italic">
            No teams in session currently. Please add teams.
          </p>
          <SessionSetup />
        </>
      )}
    </div>
  );
}
