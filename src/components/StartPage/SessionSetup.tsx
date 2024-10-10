import { Box, TextField } from "@mui/material";
import newTeamsApi from "../../api/newTeams";
import { useState } from "react";
import CommonButton from "../CommonButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useAlert } from "../../Alert";
import { getTeamInfoFromText } from "../../utils/teams";

export default function SessionSetup({}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [teamText, setTeamText] = useState("");
  const [error, setError] = useState({
    isError: false,
    errorMsg: "",
  });

  const { showAlert } = useAlert();

  const handleClickNewTeams = async () => {
    setIsLoading(true);
    // Check team data valid
    if (
      !teamText ||
      !/^([^ \n]* [0-9]{1,2}\/[0-9]{1,2} [12]\n?)*$/.test(teamText)
    ) {
      setError({
        isError: true,
        errorMsg: `Error: Team data must be of the form
        <Team A name> <Team A registration date in DD/MM> <Team A group number>
        <Team B name> <Team B registration date in DD/MM> <Team B group number>
        <Team C name> <Team C registration date in DD/MM> <Team C group number>
        …`,
      });
      setIsLoading(false);
      return;
    }

    // If team data is of valid form
    setError({
      isError: false,
      errorMsg: "",
    });

    // Get team data from text input
    let teams;
    try {
      teams = getTeamInfoFromText(teamText);
    } catch (e: any) {
      setError({
        isError: true,
        errorMsg: e,
      });
      setIsLoading(false);
    }

    // Put team data into dynamodb
    let r = await newTeamsApi(teams);
    if (r?.data && r?.data?.success && r?.data?.sessionId) {
      showAlert(
        `Successfully created teams for session ${r?.data?.sessionId}`,
        "success"
      );
      setIsLoading(false);

      navigate(`/matches?session_id=${r.data.sessionId}`);
      if (location.pathname === "/matches") {
        // Force reload if currently at /matches
        navigate(0);
      }
    } else {
      setError({
        isError: true,
        errorMsg: `Failed to create teams: ${r?.data?.data}`,
      });
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
          placeholder={`<Team A name> <Team A registration date in DD/MM> <Team A group number>
<Team B name> <Team B registration date in DD/MM> <Team B group number>
<Team C name> <Team C registration date in DD/MM> <Team C group number>`}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTeamText(event.target.value);
          }}
          value={teamText}
          FormHelperTextProps={{ style: { whiteSpace: "pre-line" } }}
          error={error.isError}
          helperText={error.isError ? error.errorMsg : ""}
        />

        <CommonButton
          onClick={handleClickNewTeams}
          variant="outlined"
          title="Start Matches"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
