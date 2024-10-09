import { TextField } from "@mui/material";
import CommonButton from "../../CommonButton";
import { matchTextToData } from "../../../utils/matches";
import updateTeamsByMatchesApi from "../../../api/updateTeamsByMatches";
import { Team } from "../../../utils/schema";
import { useState } from "react";

export default function MatchSubmission({
  matchText,
  setMatchText,
  teams,
  refetch,
}: {
  matchText: string;
  setMatchText: any;
  teams: Array<Team>;
  refetch: any;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    // Check if match text is valid by regex
    if (!/^([^ \n]* [^ \n]* [0-9]+ [0-9]+\n?)*$/.test(matchText)) {
      window.alert(`Error: Match data must be of the form 
<Team A name> <Team B name> <Team A goals scored> <Team B goals scored>
<Team B name> <Team C name> <Team B goals scored> <Team C goals scored>
<Team C name> <Team D name> <Team C goals scored> <Team D goals scored>
…`);
      return;
    }

    // Submit new match data
    let matchData = matchTextToData(matchText);
    let r = await updateTeamsByMatchesApi(teams, matchData);

    console.log(r);
    if (r && r?.data && r?.data?.success) {
      await refetch();
    } else {
      window.alert("An error occured. Check that match information is valid.");
    }

    setMatchText("");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <TextField
        fullWidth
        variant="outlined"
        multiline
        minRows={5}
        placeholder={`<Team A name> <Team B name> <Team A goals scored> <Team B goals scored>
<Team B name> <Team C name> <Team B goals scored> <Team C goals scored>
<Team C name> <Team D name> <Team C goals scored> <Team D goals scored>`}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMatchText(event.target.value);
        }}
        value={matchText}
      />

      <CommonButton
        title="Submit Match Results"
        onClick={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
