import { Box, TextField } from "@mui/material";
import newTeamsApi from "../../api/newTeams";
import { useState } from "react";
import CommonButton from "../CommonButton";
import { useNavigate } from "react-router-dom";

export default function SessionSetup({}) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [teamText, setTeamText] = useState("");

  const handleClick = async () => {
    setIsLoading(true);
    // Check team data valid
    if (!/^([^ \n]* [0-9]{1,2}\/[0-9]{1,2} [12]\n?)*$/.test(teamText)) {
      window.alert(`Error: Team data must be of the form 
      <Team A name> <Team A registration date in DD/MM> <Team A group number>
      <Team B name> <Team B registration date in DD/MM> <Team B group number>
      <Team C name> <Team C registration date in DD/MM> <Team C group number>
      …`);
      setIsLoading(false);
      return;
    }

    // Get team data
    let teamsStr = teamText.trim().split("\n");
    let teams = teamsStr.map((team: string) => {
      let [teamName, dateReg, group] = team.trim().split(" ");
      let [date, month] = dateReg.split("/");

      return {
        team_name: teamName,
        date_registered: new Date(`${month}/${date}/2024`).getTime(),
        group_number: group,
      };
    });

    // Put into dynamodb
    let r = await newTeamsApi(teams);
    console.log(r);
    if (r.data.success && r.data.sessionId) {
      return navigate(`/matches?session_id=${r.data.sessionId}`);
    }

    setIsLoading(false);
  };
  return (
    <div>
      <div className="flex flex-col border-red gap-4">
        <p className="mt-4 -mb-4">Enter teams</p>
        <TextField
          variant="outlined"
          multiline
          minRows={5}
          placeholder="<Team A name> <Team A registration date in DD/MM> <Team A group number>
<Team B name> <Team B registration date in DD/MM> <Team B group number>
<Team C name> <Team C registration date in DD/MM> <Team C group number>"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTeamText(event.target.value);
          }}
          value={teamText}
        />

        <CommonButton
          onClick={handleClick}
          variant="outlined"
          title="Start Matches"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
