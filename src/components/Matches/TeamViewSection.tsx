import { useState } from "react";
import { Team } from "../../utils/schema";
import CommonButton from "../CommonButton";
import TeamTable from "./TeamTable";
import { ClearTeamsButton, EditTeamsButton } from "./Buttons";
import SessionSetup from "../StartPage/SessionSetupPage";

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
          <div className="w-100 flex justify-end gap-2 mb-4">
            <EditTeamsButton
              teams={[...teamsGrp1ForTable, ...teamsGrp2ForTable]}
              refetch={refetch}
            />
            <ClearTeamsButton refetch={refetch} />
          </div>

          {/* Group 1 team view */}
          <div className="relative flex flex-col md:flex-row gap-4 md:gap-0 ">
            <div className="md:w-1/2">
              <div className="md:mr-2 relative bg-green-50 rounded-xl p-5 box-border z-0">
                <h4 className="text-lg font-semibold text-green-900">
                  Group 1
                </h4>
                <TeamTable teams={teamsGrp1ForTable} />
              </div>
            </div>

            {/* Group 2 team view */}
            <div className="md:w-1/2">
              <div className="md:ml-2 bg-blue-50 rounded-xl p-5 box-border">
                <h4 className=" text-lg font-semibold text-blue-900">
                  Group 2
                </h4>
                <TeamTable teams={teamsGrp2ForTable} />
              </div>
            </div>
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
