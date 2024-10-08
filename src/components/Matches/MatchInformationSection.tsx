import { Team } from "../../utils/schema";
import CommonButton from "../CommonButton";
import MatchSubmission from "./MatchSubmission";
import GroupMatchesDisplay from "./GroupMatchesDisplay";
import { useMemo } from "react";
import { ClearMatchesButton, ClearTeamsButton } from "./Buttons";

export default function MatchInformationSection({
  teamsGrp1ForTable,
  teamsGrp2ForTable,
  matchText,
  setMatchText,
  handleSubmitNewMatches,
  refetch,
}: {
  teamsGrp1ForTable: Array<Team>;
  teamsGrp2ForTable: Array<Team>;
  matchText: string;
  setMatchText: any;
  handleSubmitNewMatches: any;
  refetch?: any;
}) {
  let isMatchesPresent = useMemo(() => {
    return (
      teamsGrp1ForTable.length > 0 &&
      teamsGrp1ForTable[0] &&
      teamsGrp1ForTable[0].match_history
    );
  }, [teamsGrp1ForTable]);
  return (
    <>
      {/* If previously submitted matches, display submitted matches */}
      {isMatchesPresent ? (
        // Show matches
        <>
          {/* Button bar */}
          <div className="justify-end flex gap-2">
            <ClearMatchesButton refetch={refetch} />
          </div>

          <div className="flex flex-col gap-10">
            {/* Group 1 */}
            <GroupMatchesDisplay
              groupTeamData={teamsGrp1ForTable}
              groupNumber={"1"}
              refetch={refetch}
            />

            {/* Group 2 */}
            <GroupMatchesDisplay
              groupTeamData={teamsGrp2ForTable}
              groupNumber={"2"}
              refetch={refetch}
            />
          </div>
        </>
      ) : (
        // Submit new matches if no matches currently in database
        <MatchSubmission
          matchText={matchText}
          setMatchText={setMatchText}
          handleSubmit={handleSubmitNewMatches}
        />
      )}
    </>
  );
}
