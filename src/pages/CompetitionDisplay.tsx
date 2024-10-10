import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import getTeamsFromSessionId from "../api/getTeamsFromSessionId";
import { formatTeamsForDisplay, sortTeams } from "../utils/teams";
import { Match2Player, Team } from "../utils/schema";
import TeamView from "../components/CompetitionDisplay/TeamSection/TeamViewSection";
import Header from "../components/Header";
import updateTeamsByMatchesApi from "../api/updateTeamsByMatches";
import MatchInformationSection from "../components/CompetitionDisplay/MatchSection/MatchInformationSection";
import { matchTextToData } from "../utils/matches";
import { CircularProgress } from "@mui/material";

export default function Matches({}) {
  let [searchParams, setSearchParams] = useSearchParams();
  let [teams, setTeams] = useState([]);
  let [matchText, setMatchText] = useState("");
  let [pageLoading, setPageLoading] = useState(false);

  // Refetch team information for a specific session
  const refetch = async () => {
    setPageLoading(true);

    let r = await getTeamsFromSessionId(searchParams.get("session_id") || "");
    if (r.data?.success && r.data?.data) {
      setTeams(r.data?.data);
    }

    setPageLoading(false);
  };

  useEffect(() => {
    const fetch = async () => {
      await refetch();
    };
    fetch();
  }, []);

  // Format teams into format that can be displayed in table
  // Also sort the teams based on sorting requirements
  let teamsGrp1ForTable = useMemo(() => {
    let teamgrp1 = teams.filter((team: Team) => team.group_number == 1);
    return formatTeamsForDisplay(sortTeams(teamgrp1));
  }, [teams]);

  let teamsGrp2ForTable = useMemo(() => {
    let teamgrp2 = teams.filter((team: Team) => team.group_number == 2);
    return formatTeamsForDisplay(sortTeams(teamgrp2));
  }, [teams]);

  return (
    <div className="">
      {pageLoading ? (
        <>
          <CircularProgress size="large" />
        </>
      ) : (
        <>
          <Header />

          {/* Current teams display */}
          <div className="mx-5 my-5 lg:mx-20">
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
                refetch={refetch}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
