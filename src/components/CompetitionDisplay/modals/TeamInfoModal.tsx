import React, { useMemo, useState } from "react";
import { Modal, Box, Typography, IconButton, Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CommonButton from "../../CommonButton";
import { Match, Match2Player, Team } from "../../../utils/schema";
import MatchResultTable from "../MatchSection/MatchResultTable";

export default function TeamInfoModal({
  team,
  open,
  setOpen,
}: {
  team: Team;
  open: boolean;
  setOpen: any;
}) {
  let matches: Array<Match2Player> = useMemo(() => {
    let matchHist = team.match_history;
    return (
      matchHist?.map((singleMatch: Match) => {
        return {
          team1_name: team.team_name,
          team2_name: singleMatch.opponent_name,
          team1_goals: singleMatch.goals_scored,
          team2_goals: singleMatch.goals_opponent_scored,
        };
      }) || []
    );
  }, [team]);

  return (
    <Drawer open={open} anchor="right">
      <div className="bg-gray-50 px-5 py-10 w-96 md:max-w-xl h-screen overflow-auto">
        <Typography
          variant="h5"
          component="h2"
          sx={{
            marginBottom: 2,
          }}
        >
          Team:{" "}
          <span className="text-gray-700 font-semibold">{team.team_name}</span>
        </Typography>

        <div className="flex flex-col gap-10">
          {/* General Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              General Info
            </h3>
            <div className="shadow-sm bg-white p-4 rounded-md flex flex-col gap-2">
              <p>Group: {team.group_number}</p>
              <p>Date Registered: {team?.date_registered}</p>
            </div>
          </div>

          {/* Overall Stats */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Overall Stats
            </h3>
            <div className="shadow-sm bg-white p-4 rounded-md flex flex-col gap-2">
              <p>Wins: {team?.num_wins || "-"}</p>
              <p>Losses: {team?.num_losses || "-"}</p>
              <p>Draws: {team?.num_draws || "-"}</p>
              <p>Total goals: {team?.total_goals || "-"}</p>
            </div>
          </div>

          {/* Past History */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Match History
            </h3>
            <div className="shadow-sm bg-white p-4 rounded-md flex flex-col gap-2">
              {matches.length > 0 ? (
                <MatchResultTable
                  matches={matches}
                  setMatches={undefined}
                  isEditing={false}
                />
              ) : (
                <p className="text-sm text-gray-60 italic">No match data yet</p>
              )}
            </div>
          </div>
        </div>

        <IconButton
          onClick={() => {
            setOpen(false);
          }}
          style={{
            position: "absolute",
            top: 5,
            right: 5,
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
    </Drawer>
  );
}
