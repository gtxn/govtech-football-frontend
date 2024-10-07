import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TextField } from "@mui/material";

import getTeamsFromSessionId from "../api/getTeamsFromSessionId";
import TeamTable from "../components/Matches/TeamTable";
import CommonButton from "../components/CommonButton";
import {
  formatTeamsForDisplay,
  sortTeams,
  updateTeamsBasedOnMatches,
} from "../utils/teamSorting";
import { Team } from "../utils/schema";
import TeamView from "../components/Matches/TeamView";
import MatchSubmission from "../components/Matches/MatchSubmission";
import Header from "../components/Header";

export default function Matches({}) {
  let [searchParams, setSearchParams] = useSearchParams();
  let [teams, setTeams] = useState([]);
  let [matchText, setMatchText] = useState("");

  const handleSubmit = async () => {
    let matchDataText = matchText.split("\n");

    let updatedTeams: any = updateTeamsBasedOnMatches(teams, matchDataText);
    setTeams(updatedTeams);
  };

  useEffect(() => {
    // TODO: reinstate if have connection
    getTeamsFromSessionId(searchParams.get("session_id") || "").then((r) => {
      console.log(r);
      if (r.data?.success && r.data?.data) {
        setTeams(r.data?.data);
      }
    });

    // If have no connection
    // let dummyTeams: any = [
    //   {
    //     team_name: "firstTeam",
    //     date_registered: new Date().getTime(),
    //     group_number: 2,
    //   },
    //   {
    //     team_name: "secondTeam",
    //     date_registered: new Date().getTime(),
    //     group_number: 2,
    //   },
    //   {
    //     team_name: "thirdTeam",
    //     date_registered: new Date().getTime(),
    //     group_number: 1,
    //   },
    //   {
    //     team_name: "fourthTeam",
    //     date_registered: new Date().getTime(),
    //     group_number: 1,
    //   },
    // ];

    // setTeams(dummyTeams);
  }, []);

  // Format teams into format that can be displayed in table
  // Also sort the teams based on requirements
  let teamsGrp1ForTable = useMemo(() => {
    let teamgrp1 = teams.filter((team: Team) => team.group_number == 1);
    return formatTeamsForDisplay(sortTeams(teamgrp1));
  }, [teams]);
  let teamsGrp2ForTable = useMemo(() => {
    let teamgrp2 = teams.filter((team: Team) => team.group_number == 2);
    return formatTeamsForDisplay(sortTeams(teamgrp2));
  }, [teams]);

  return (
    <div className="px-10 py-5">
      <Header />

      {/* Current teams display */}
      <h3 className="text-3xl mb-3 mt-2">Current Teams</h3>
      <TeamView
        teamsGrp1ForTable={teamsGrp1ForTable}
        teamsGrp2ForTable={teamsGrp2ForTable}
      />

      <h3 className="text-3xl mb-3 mt-6">Match Results</h3>

      {/* Submitting match results */}
      <MatchSubmission
        matchText={matchText}
        setMatchText={setMatchText}
        handleSubmit={handleSubmit}
      />

      {/* Showing match results */}
    </div>
  );
}
