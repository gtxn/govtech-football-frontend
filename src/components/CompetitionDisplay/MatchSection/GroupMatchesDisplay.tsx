import { useEffect, useState } from "react";
import { EditMatchesButton } from "../Buttons";
import MatchResultTable from "./MatchResultTable";
import { Team } from "../../../utils/schema";
import updateTeamsByMatchesApi from "../../../api/updateTeamsByMatches";
import { getMatches } from "../../../utils/matches";
import { useAlert } from "../../../Alert";

export default function GroupMatchesDisplay({
  groupTeamData,
  groupNumber,
  refetch,
  colorTheme,
}: {
  groupTeamData: Array<Team>;
  groupNumber: string | number;
  refetch?: any;
  colorTheme?: "green" | "blue";
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [matches, setMatches] = useState([]);

  const { showAlert } = useAlert();

  let resetMatches = () => {
    let m: any = getMatches(groupTeamData);
    setMatches(m);
  };

  useEffect(() => {
    resetMatches();
  }, [groupTeamData]);

  const handleSubmitEditMatches = async () => {
    // Send request to update team
    let r = await updateTeamsByMatchesApi(groupTeamData, matches);

    if (r && r?.data && r?.data?.success) {
      await refetch();
      showAlert(`Successfully uploaded match data`, "success");
    } else {
      showAlert(`Failed to upload match data: ${r?.data?.data}`, "error");
    }
    setIsEditing(false);
  };

  const background = colorTheme === "green" ? "bg-green-50" : "bg-blue-50";
  const textColor = colorTheme === "green" ? "text-green-900" : "text-blue-900";

  return (
    <div className={`${background} p-6 rounded-lg shadow-sm"`}>
      <div className="flex flex-row gap-4 items-center">
        <h4 className={`${textColor} text-lg font-semibold`}>
          Group {groupNumber}
        </h4>
        <EditMatchesButton
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          resetMatches={resetMatches}
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
