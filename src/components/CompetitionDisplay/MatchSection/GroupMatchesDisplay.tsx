import { useEffect, useState } from "react";
import { EditMatchesButton } from "../Buttons";
import MatchResultTable from "./MatchResultTable";
import { Team } from "../../../utils/schema";
import updateTeamsByMatchesApi from "../../../api/updateTeamsByMatches";
import { getMatches } from "../../../utils/matches";

export default function GroupMatchesDisplay({
  groupTeamData,
  groupNumber,
  refetch,
}: {
  groupTeamData: Array<Team>;
  groupNumber: string | number;
  refetch?: any;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    let m: any = getMatches(groupTeamData);
    setMatches(m);
  }, [groupTeamData]);

  const handleSubmitEditMatches = async () => {
    // Send request to update team
    let r = await updateTeamsByMatchesApi(groupTeamData, matches);

    if (r && r?.data && r?.data?.success) {
      await refetch();
    }
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex flex-row gap-4 items-center">
        <h4 className="text-lg font-semibold">Group {groupNumber}</h4>
        <EditMatchesButton
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          refetch={refetch}
          handleSubmit={handleSubmitEditMatches}
        />
      </div>
      <MatchResultTable
        matches={matches}
        setMatches={setMatches}
        isEditing={isEditing}
      />
    </div>
  );
}
