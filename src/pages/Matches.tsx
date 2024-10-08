import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import getTeamsFromSessionId from "../api/getTeamsFromSessionId";
import { formatTeamsForDisplay, sortTeams } from "../utils/teams";
import { Match2Player, Team } from "../utils/schema";
import TeamView from "../components/Matches/TeamViewSection";
import Header from "../components/Header";
import updateTeamsByMatchesApi from "../api/updateTeamsByMatches";
import MatchInformationSection from "../components/Matches/MatchInformationSection";
import { matchTextToData } from "../utils/matches";

export default function Matches({}) {
  let [searchParams, setSearchParams] = useSearchParams();
  let [teams, setTeams] = useState([]);
  let [matchText, setMatchText] = useState("");

  const refetch = async () => {
    getTeamsFromSessionId(searchParams.get("session_id") || "").then((r) => {
      if (r.data?.success && r.data?.data) {
        setTeams(r.data?.data);
      }
    });
  };

  const handleSubmitNewMatchData = async () => {
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

    if (r && r?.data && r?.data?.success) {
      await refetch();
      setMatchText("");
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await refetch();
    };
    fetch();
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
        refetch={refetch}
      />

      {/* Match information */}
      <h3 className="text-3xl mb-3 mt-6">Match Information</h3>
      <div className="w-full flex flex-col gap-2 bg-white shadow-sm p-6 rounded-xl">
        <MatchInformationSection
          teamsGrp1ForTable={teamsGrp1ForTable}
          teamsGrp2ForTable={teamsGrp2ForTable}
          matchText={matchText}
          setMatchText={setMatchText}
          handleSubmitNewMatches={handleSubmitNewMatchData}
          refetch={refetch}
        />
      </div>
    </div>
  );
}
